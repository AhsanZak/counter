def pyramid(n):
    x = n
    for i in range(0, n):
        for y in range(x):
            print(" ", end="")
        x = x-1
        for k in range(0, i+1):
            print("* ", end='')
        print("\n")


pyramid(5)