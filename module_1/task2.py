# Walrus operator - Formally known as the "assignment expression operator"
# Allows assigning a value to a variable within a larger expression

# Benefit - evaluates the expression -> assigns the result of that expression to the variable -> returns the value - It does all this in one expression
# Helps reduce redundant code and extra function calls

def main():
    # Stream lining while loops
    # This will continually ask for inputs until the input is "quit"
    while (line := input("Enter something: ")) != "quit":
        print(line)

    # This removes the need to have a while (True) loop with a break i.e:

    while (True):
        line = input("Enter something: ")
        if (line == "quit"): 
            break
        else:
            print(line)


    # Can also be used to optimize if statements
    # Optimizing if statement

    # Without walrus
    foo = get_bar()
    if foo:
        print(f"{foo}")
        # Do something with foo

    # With walrus
    if foo := get_bar():
        print(f"{foo}")
        # Do something with foo

def get_bar():
    return "bar"    

if __name__ == "__main__":
    main()