"""

We want to create a spreadsheet that mimics the familiar grid of columns A–Z and user-specified rows. 
Each cell holds an integer and defaults to 0 unless explicitly set. To make this possible, we represent 
the spreadsheet internally as a 2D array where columns map from letters to indices and rows are offset 
by one for indexing. The system supports updating individual cells, resetting them, and computing simple 
formulas of the form =X+Y. By parsing inputs, checking whether they are numbers or references, and 
retrieving their values from the grid, we can efficiently evaluate formulas and maintain the state of the spreadsheet.

"""

class Spreadsheet:
    def __init__(self, rows: int):
        self.rows = rows
        self.cols = 26
        self.grid = [[0] * self.cols for _ in range(rows)]

    def _parseCell(self, cell: str):
        col = ord(cell[0]) - ord('A')
        row = int(cell[1:]) - 1
        return row, col

    def setCell(self, cell: str, value: int) -> None:
        row, col = self._parseCell(cell)
        self.grid[row][col] = value

    def resetCell(self, cell: str) -> None:
        row, col = self._parseCell(cell)
        self.grid[row][col] = 0

    def getValue(self, formula: str) -> int:
        formula = formula[1:]  
        parts = formula.split('+')
        total = 0
        for part in parts:
            if part.isdigit():  
                total += int(part)
            else:  
                row, col = self._parseCell(part)
                total += self.grid[row][col]
        return total


def main():
    sheet = Spreadsheet(10)
    sheet.setCell("A1", 5)
    sheet.setCell("B2", 10)
    print(sheet.getValue("=A1+5"))   
    print(sheet.getValue("=A1+B2")) 
    sheet.resetCell("A1")
    print(sheet.getValue("=A1+B2"))   


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(1) for set and reset, O(l) for getValue
Space complexity is O(rows)

"""
