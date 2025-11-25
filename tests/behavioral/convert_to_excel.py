#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to convert test cases markdown file to Excel format
"""

import re
import pandas as pd
from pathlib import Path

def clean_text(text):
    """Clean markdown formatting from text"""
    if not text:
        return ""
    # Convert <br> tags to newlines first
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)
    # Remove markdown links
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    # Remove markdown bold/italic
    text = re.sub(r'\*\*([^\*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^\*]+)\*', r'\1', text)
    # Remove other HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove checkbox markers
    text = re.sub(r'- \[ \]', '-', text)
    text = re.sub(r'- \[x\]', '- ✓', text)
    # Clean up multiple spaces
    text = re.sub(r'  +', ' ', text)
    # Remove multiple newlines (keep max 2)
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove leading/trailing whitespace
    text = text.strip()
    return text

def parse_test_case(content, start_idx):
    """Parse a single test case from markdown"""
    test_case = {
        'ID Test case': '',
        'Description Test case': '',
        'Test case Procedure': '',
        'Expected Output': '',
        'Test Data': '',
        'Date': '',
        'Step Result': '',
        'Case Result': '',
        'Note': ''
    }
    
    # Find the test case ID from header
    header_match = re.search(r'^## (TC-BHV-\d+):\s*(.+)$', content[start_idx:], re.MULTILINE)
    if header_match:
        test_case['ID Test case'] = header_match.group(1)
        test_case['Description Test case'] = header_match.group(2).strip()
    
    # Find table with test case details
    # Look for the first table after the header
    table_pattern = r'\|\s*Field\s*\|\s*Details\s*\|'
    table_match = re.search(table_pattern, content[start_idx:], re.MULTILINE)
    
    if table_match:
        table_start = start_idx + table_match.start()
        # Extract table content - look for the first table (before <details>)
        section_end = content.find('<details>', table_start)
        if section_end == -1:
            section_end = start_idx + 2000
        
        table_content = content[table_start:section_end]
        lines = table_content.split('\n')
        
        current_field = None
        current_value = []
        
        for line in lines:
            line = line.strip()
            if not line or line.startswith('---'):
                continue
            
            if line.startswith('|') and 'Field' not in line:
                parts = [p.strip() for p in line.split('|') if p.strip()]
                if len(parts) >= 2:
                    field = parts[0].replace('**', '').strip()
                    value = '|'.join(parts[1:]).strip()
                    
                    # If we have a previous field, save it
                    if current_field and current_value:
                        test_case[current_field] = clean_text('\n'.join(current_value))
                    
                    # Start new field
                    current_field = None
                    current_value = [value]
                    
                    # Map field names
                    if 'ID Test case' in field:
                        current_field = 'ID Test case'
                    elif 'Description' in field and 'Test case' in field:
                        current_field = 'Description Test case'
                    elif 'Procedure' in field:
                        current_field = 'Test case Procedure'
                    elif 'Expected Output' in field:
                        current_field = 'Expected Output'
                    elif 'Test Data' in field:
                        current_field = 'Test Data'
                    elif 'Date' in field:
                        current_field = 'Date'
                    elif 'Step Result' in field:
                        current_field = 'Step Result'
                    elif 'Case Result' in field:
                        current_field = 'Case Result'
                    elif 'Note' in field:
                        current_field = 'Note'
        
        # Save last field
        if current_field and current_value:
            test_case[current_field] = clean_text('\n'.join(current_value))
    
    # If table parsing didn't work well, try to find sections
    if not test_case['Test case Procedure']:
        # Look for "### Các bước thực hiện" or "Test case Procedure"
        procedure_match = re.search(r'(?:### Các bước thực hiện|Test case Procedure)[\s\S]*?(?=###|##|$)', content[start_idx:start_idx+2000], re.MULTILINE)
        if procedure_match:
            procedure_text = procedure_match.group(0)
            # Extract numbered steps
            steps = re.findall(r'\d+\.\s*\*\*([^\*]+)\*\*[\s\S]*?(?=\d+\.\s*\*\*|$)', procedure_text)
            if steps:
                test_case['Test case Procedure'] = '\n'.join([f"{i+1}. {step}" for i, step in enumerate(steps)])
    
    if not test_case['Expected Output']:
        # Look for "### Kết quả mong đợi"
        expected_match = re.search(r'### Kết quả mong đợi[\s\S]*?(?=###|##|$)', content[start_idx:start_idx+2000], re.MULTILINE)
        if expected_match:
            test_case['Expected Output'] = clean_text(expected_match.group(0))
    
    if not test_case['Test Data']:
        # Look for "### Loại test" and "### Tiền điều kiện"
        test_data_parts = []
        test_type_match = re.search(r'### Loại test[\s\S]*?(?=###|##|$)', content[start_idx:start_idx+2000], re.MULTILINE)
        if test_type_match:
            test_data_parts.append(clean_text(test_type_match.group(0)))
        
        precondition_match = re.search(r'### Tiền điều kiện[\s\S]*?(?=###|##|$)', content[start_idx:start_idx+2000], re.MULTILINE)
        if precondition_match:
            test_data_parts.append(clean_text(precondition_match.group(0)))
        
        if test_data_parts:
            test_case['Test Data'] = '\n\n'.join(test_data_parts)
    
    return test_case

def parse_markdown_file(file_path):
    """Parse the entire markdown file and extract all test cases"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    test_cases = []
    
    # Find all test case headers
    test_case_headers = list(re.finditer(r'^## (TC-BHV-\d+):', content, re.MULTILINE))
    
    for i, header_match in enumerate(test_case_headers):
        start_idx = header_match.start()
        end_idx = test_case_headers[i + 1].start() if i + 1 < len(test_case_headers) else len(content)
        
        test_case = parse_test_case(content, start_idx)
        if test_case['ID Test case']:
            test_cases.append(test_case)
    
    return test_cases

def main():
    """Main function to convert markdown to Excel"""
    # Get the script directory
    script_dir = Path(__file__).parent
    md_file = script_dir / 'all-test-cases.md'
    excel_file = script_dir / 'all-test-cases.xlsx'
    
    if not md_file.exists():
        print(f"Error: {md_file} not found!")
        return
    
    print(f"Reading markdown file: {md_file.name}")
    all_test_cases = parse_markdown_file(md_file)
    print(f"Found {len(all_test_cases)} test cases")
    
    # Create DataFrame
    df = pd.DataFrame(all_test_cases)
    
    # Reorder columns
    column_order = [
        'ID Test case',
        'Description Test case',
        'Test case Procedure',
        'Expected Output',
        'Test Data',
        'Date',
        'Step Result',
        'Case Result',
        'Note'
    ]
    
    # Ensure all columns exist
    for col in column_order:
        if col not in df.columns:
            df[col] = ''
    
    df = df[column_order]
    
    # Write to Excel
    print(f"Writing to Excel file: {excel_file}")
    with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='Test Cases', index=False)
        
        # Get worksheet
        worksheet = writer.sheets['Test Cases']
        from openpyxl.utils import get_column_letter
        from openpyxl.styles import Alignment
        from openpyxl.worksheet.datavalidation import DataValidation
        
        # Define column widths (in characters)
        column_widths = {
            'ID Test case': 15,
            'Description Test case': 40,
            'Test case Procedure': 60,
            'Expected Output': 60,
            'Test Data': 50,
            'Date': 30,
            'Step Result': 15,
            'Case Result': 15,
            'Note': 50
        }
        
        # Create Data Validation for Step Result and Case Result columns
        pass_fail_dv = DataValidation(
            type="list",
            formula1='"Pass,Fail"',
            allow_blank=True,
            showDropDown=True
        )
        pass_fail_dv.error = 'Vui lòng chọn Pass hoặc Fail'
        pass_fail_dv.errorTitle = 'Giá trị không hợp lệ'
        pass_fail_dv.prompt = 'Chọn Pass hoặc Fail'
        pass_fail_dv.promptTitle = 'Kết quả test'
        
        # Find column indices for Step Result and Case Result
        step_result_col = None
        case_result_col = None
        for idx, col_name in enumerate(df.columns, start=1):
            if col_name == 'Step Result':
                step_result_col = idx
            elif col_name == 'Case Result':
                case_result_col = idx
        
        # Apply formatting to all cells
        for row_idx, row in enumerate(worksheet.iter_rows(min_row=1, max_row=worksheet.max_row, min_col=1, max_col=len(df.columns)), start=1):
            for col_idx, cell in enumerate(row, start=1):
                col_name = df.columns[col_idx - 1]
                
                # Enable wrap text for all cells
                cell.alignment = Alignment(
                    wrap_text=True,
                    vertical='top',
                    horizontal='left'
                )
                
                # Set column width
                if row_idx == 1:  # Only set width once per column
                    col_letter = get_column_letter(col_idx)
                    width = column_widths.get(col_name, 30)
                    worksheet.column_dimensions[col_letter].width = width
                
                # Clean up checkbox text for Step Result and Case Result columns
                if col_name in ['Step Result', 'Case Result'] and row_idx > 1:
                    if cell.value:
                        cell_value = str(cell.value).strip()
                        
                        # If already "Pass" or "Fail" (from previous run or user input), keep it
                        if cell_value.upper() in ['PASS', 'FAIL']:
                            cell.value = cell_value.capitalize()  # Keep Pass or Fail
                        else:
                            # Extract Pass or Fail from checkbox format
                            pass_match = re.search(r'(?:⬜\s*)?Pass', cell_value, re.IGNORECASE)
                            fail_match = re.search(r'(?:⬜\s*)?Fail', cell_value, re.IGNORECASE)
                            
                            # Keep Pass or Fail value if found in checkbox format
                            if pass_match:
                                cell.value = 'Pass'
                            elif fail_match:
                                cell.value = 'Fail'
                            else:
                                # If it's just checkbox markers without selection, leave empty
                                if '⬜' in cell_value and ('Pass' in cell_value or 'Fail' in cell_value):
                                    # Has checkbox but not selected, leave empty for dropdown
                                    cell.value = None
                                else:
                                    # Remove checkbox markers but keep other text
                                    cell_value = re.sub(r'⬜\s*', '', cell_value)
                                    cell.value = cell_value.strip() if cell_value.strip() else None
                    else:
                        # If empty, keep it empty for dropdown selection
                        cell.value = None
        
        # Apply Data Validation to Step Result and Case Result columns
        if step_result_col:
            col_letter = get_column_letter(step_result_col)
            range_str = f"{col_letter}2:{col_letter}{worksheet.max_row}"
            worksheet.add_data_validation(pass_fail_dv)
            pass_fail_dv.add(range_str)
        
        if case_result_col:
            col_letter = get_column_letter(case_result_col)
            range_str = f"{col_letter}2:{col_letter}{worksheet.max_row}"
            # Create new validation for Case Result (can reuse same validation object)
            case_result_dv = DataValidation(
                type="list",
                formula1='"Pass,Fail"',
                allow_blank=True,
                showDropDown=True
            )
            case_result_dv.error = 'Vui lòng chọn Pass hoặc Fail'
            case_result_dv.errorTitle = 'Giá trị không hợp lệ'
            case_result_dv.prompt = 'Chọn Pass hoặc Fail'
            case_result_dv.promptTitle = 'Kết quả test'
            worksheet.add_data_validation(case_result_dv)
            case_result_dv.add(range_str)
        
        # Format header row
        from openpyxl.styles import Font, PatternFill
        header_fill = PatternFill(start_color="366092", end_color="366092", fill_type="solid")
        header_font = Font(bold=True, color="FFFFFF", size=11)
        
        for cell in worksheet[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        
        # Set row height for better visibility (auto-adjust for wrapped text)
        for row_idx in range(2, worksheet.max_row + 1):
            worksheet.row_dimensions[row_idx].height = None  # Auto height
        
        # Create Summary sheet
        summary_sheet = writer.book.create_sheet("Tổng hợp", 0)  # Insert at the beginning
        
        # Find column letters for Step Result and Case Result
        step_result_letter = get_column_letter(step_result_col) if step_result_col else 'G'
        case_result_letter = get_column_letter(case_result_col) if case_result_col else 'H'
        
        # Define summary data with correct column references
        summary_data = [
            ["BÁO CÁO TỔNG HỢP TEST CASES", ""],
            ["", ""],
            ["Tổng số test case", f"=COUNTA('Test Cases'!A:A)-1"],  # -1 to exclude header
            ["", ""],
            ["Số lượng đã test", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Pass\")+COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Fail\")"],  # Count Pass + Fail in Case Result
            ["Số lượng chưa test", "=A3-A5"],  # Total - Tested
            ["", ""],
            ["Số lượng Pass", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Pass\")"],  # Count Pass in Case Result
            ["Số lượng Fail", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Fail\")"],  # Count Fail in Case Result
            ["Số lượng test case có Kết quả mong muốn = Pass", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Pass\")"],  # Same as Pass count
            ["", ""],
            ["Tỷ lệ Pass", "=IF(A3>0,ROUND(A8/A3*100,2)&\"%\",\"0%\")"],
            ["Tỷ lệ Fail", "=IF(A3>0,ROUND(A9/A3*100,2)&\"%\",\"0%\")"],
            ["Tỷ lệ đã test", "=IF(A3>0,ROUND(A5/A3*100,2)&\"%\",\"0%\")"],
            ["", ""],
            ["CHI TIẾT THEO CỘT", ""],
            ["", ""],
            ["Step Result - Pass", f"=COUNTIF('Test Cases'!{step_result_letter}:{step_result_letter},\"Pass\")"],
            ["Step Result - Fail", f"=COUNTIF('Test Cases'!{step_result_letter}:{step_result_letter},\"Fail\")"],
            ["Step Result - Chưa test", "=A3-A18-A19"],
            ["", ""],
            ["Case Result - Pass", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Pass\")"],
            ["Case Result - Fail", f"=COUNTIF('Test Cases'!{case_result_letter}:{case_result_letter},\"Fail\")"],
            ["Case Result - Chưa test", "=A3-A22-A23"],
        ]
        
        # Write summary data
        for row_idx, row_data in enumerate(summary_data, start=1):
            for col_idx, value in enumerate(row_data, start=1):
                cell = summary_sheet.cell(row=row_idx, column=col_idx)
                if isinstance(value, str) and value.startswith('='):
                    # It's a formula
                    cell.value = value
                else:
                    cell.value = value
                
                # Format header
                if row_idx == 1:
                    cell.font = Font(bold=True, size=16, color="FFFFFF")
                    cell.fill = PatternFill(start_color="366092", end_color="366092", fill_type="solid")
                    cell.alignment = Alignment(horizontal='center', vertical='center')
                elif row_idx in [3, 5, 8, 9, 10, 12, 16, 18, 21]:  # Section headers and key metrics
                    if col_idx == 1:
                        cell.font = Font(bold=True, size=11)
                    elif col_idx == 2 and not (isinstance(value, str) and value.startswith('=')):
                        cell.font = Font(bold=True, size=12, color="366092")
                elif isinstance(value, str) and value.startswith('='):
                    # Formula cells - format as number or percentage
                    cell.number_format = '#,##0' if 'COUNT' in value or 'COUNTA' in value else 'General'
                    cell.font = Font(bold=True, size=11, color="2E7D32" if 'Pass' in str(value) else "C62828" if 'Fail' in str(value) else "000000")
        
        # Set column widths
        summary_sheet.column_dimensions['A'].width = 35
        summary_sheet.column_dimensions['B'].width = 20
        
        # Merge header cells
        summary_sheet.merge_cells('A1:B1')
        summary_sheet['A1'].alignment = Alignment(horizontal='center', vertical='center')
    
    print(f"\nSuccessfully converted to Excel: {excel_file}")
    print(f"  Total test cases: {len(all_test_cases)}")
    print(f"  - Wrap text enabled for all columns")
    print(f"  - Data Validation (Pass/Fail dropdown) added for Step Result and Case Result")
    print(f"  - Summary sheet created with auto-updating statistics")

if __name__ == '__main__':
    main()

