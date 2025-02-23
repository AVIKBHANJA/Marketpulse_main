
# 1. Basic Example of a Tool

from langchain.tools import tool 

class CalculatorTools():

    @tool("Make a Calculation")
    def calculate(operation):
        """
        Useful to perform any mathematical calculations,
        like addition, subtraction, multiplication, division, etc.
        The input to this tool should be a mathematical expression, 
        For Example, '200*7' or '5000/2*10' 
        """
        try:
            return eval(operation)
        except:
            return "Error: Invalid syntax in mathematical expression"


# 2.  In Depth Example of a Tool which is more flexible

# from pydantic import BaseModel, Field
# from langchain.tools import tool

# class CalculatorInput(BaseModel):
#     operation: str = Field(
#         ...,
#         title="Mathematical Expression",
#         description="The mathematical expression to perform calculations",
#         min_length=1,
#         max_length=100,
#     )
#     factor: float = Field(
#         ...,
#         title="Factor",
#         description="Enter a factor to multiply the result",
#     )

# @tool("perform calculation", args_schema=CalculatorInput, return_direct=True)
# def perform_calculation(operation: str, factor: float) -> str:
#     """
#         Perform a specific mathematical operation on a given expression and multiple by the given factor

#         Parameters:
#         - operation (str): A string representing  a mathematical operation (eg "10 + 5")
#         - factor (float): A factor by which to multiply the result of operation (eg 10.2)

#         Returns:
#             a string representing the result of the operation multiplied by the factor
#     """
#     result = eval(operation) * factor 
#     return f"The result of the operation is {result}"







