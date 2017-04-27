from collections import Iterable
print(isinstance('abc', Iterable))     # True

print(isinstance(23, Iterable))        # False

print(isinstance([1, 2, 3], Iterable)) # True
