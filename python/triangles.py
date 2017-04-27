# 定义杨辉三角
def triangles():
    L = [1]
    while True:
        yield L
        L.append(0)
        L = [L[i - 1] + L[i] for i in range(len(L))]

for v in triangles():
    print(v)
