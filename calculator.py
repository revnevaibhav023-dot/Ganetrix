class Calculator:
    """A professional calculator with error handling"""
    
    def add(self, a, b):
        """Add two numbers"""
        return a + b
    
    def subtract(self, a, b):
        """Subtract two numbers"""
        return a - b
    
    def multiply(self, a, b):
        """Multiply two numbers"""
        return a * b
    
    def divide(self, a, b):
        """Divide two numbers with error handling"""
        if b == 0:
            return "Error: Cannot divide by zero"
        return a / b
    
    def power(self, a, b):
        """Calculate power"""
        return a ** b
    
    def square_root(self, a):
        """Calculate square root"""
        if a < 0:
            return "Error: Cannot calculate square root of negative number"
        return a ** 0.5
    
    def modulus(self, a, b):
        """Calculate modulus (remainder)"""
        if b == 0:
            return "Error: Cannot divide by zero"
        return a % b


def main():
    """Main function to run calculator"""
    calc = Calculator()
    
    print("=" * 50)
    print("WELCOME TO GANETRIX CALCULATOR")
    print("=" * 50)
    
    while True:
        print("\nChoose an operation:")
        print("1. Addition (+)")
        print("2. Subtraction (-)")
        print("3. Multiplication (*)")
        print("4. Division (/)")
        print("5. Power (**)")
        print("6. Square Root (√)")
        print("7. Modulus (%)")
        print("8. Exit")
        
        choice = input("\nEnter your choice (1-8): ").strip()
        
        if choice == '8':
            print("\nThank you for using Ganetrix Calculator! Goodbye!")
            break
        
        if choice in ['1', '2', '3', '4', '5', '7']:
            try:
                num1 = float(input("Enter first number: "))
                num2 = float(input("Enter second number: "))
                
                if choice == '1':
                    print(f"Result: {num1} + {num2} = {calc.add(num1, num2)}")
                elif choice == '2':
                    print(f"Result: {num1} - {num2} = {calc.subtract(num1, num2)}")
                elif choice == '3':
                    print(f"Result: {num1} × {num2} = {calc.multiply(num1, num2)}")
                elif choice == '4':
                    print(f"Result: {num1} ÷ {num2} = {calc.divide(num1, num2)}")
                elif choice == '5':
                    print(f"Result: {num1} ** {num2} = {calc.power(num1, num2)}")
                elif choice == '7':
                    print(f"Result: {num1} % {num2} = {calc.modulus(num1, num2)}")
            
            except ValueError:
                print("Error: Please enter valid numbers!")
        
        elif choice == '6':
            try:
                num = float(input("Enter number: "))
                print(f"Result: √{num} = {calc.square_root(num)}")
            except ValueError:
                print("Error: Please enter a valid number!")
        
        else:
            print("Invalid choice! Please select 1-8.")


if __name__ == "__main__":
    main()