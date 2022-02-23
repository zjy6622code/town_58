import random
import hashlib


def randomKey(length=128):
    _key = ''
    for _ in range(length):
        _f = random.randint(0, 2)
        if _f == 0:
            # 数字0~9
            _key += chr(random.randint(48, 57))
        elif _f == 1:
            # 大写字母
            _key += chr(random.randint(65, 90))
        else:
            # 小写字母
            _key += chr(random.randint(97, 122))
    return _key


def func41(chars):
    res = list()
    for i in range(len(chars)):
        try:
            _in = ord(chars[i + 1])
            v8 = _in % 3
            if v8 % 2 == 0:
                v8 = -v8
            res.append(chr(ord(chars[i]) + v8))
        except IndexError:
            res.append(chars[i])
    return ''.join(res)


def func42(chars):
    key = 'sdaetczosmbzruic'
    chars = list(chars)
    rand_k = 0
    for i in range(len(chars)):
        char_index = rand_k - len(key)
        if rand_k != len(key):
            char_index = rand_k
        chars[i] = chr(ord(key[char_index]) + ord(str(chars[i])) - 97)
        rand_k = char_index + 1
    return ''.join(chars)


def func43(chars):
    Len = len(chars)
    chars = list(chars)
    v7, v8 = 0, 0
    for C in chars:
        v9 = ord(C)
        v8 += v9
    v10 = v8 % 5
    if v8 % 5 == 0:
        v10 = 1
    if v10 > Len:
        v10 = v10 % Len
    v30 = 2 * v10
    v11 = Len
    # v12 = chars[v10:]  # &text[v10] ????
    v13 = Len - v10
    for i in range(v13):
        if i % v30 < v10:
            v15 = chars[i]
            chars[i] = chars[i + v10]
            chars[i + v10] = v15
    v16 = v10 + 3
    if (v10 + 3) > v11:
        v16 = v16 % v11
    # v17 = chars[:-v16]  # &text[-v16] ????
    v18 = v11 - 1
    v19 = 0
    while v18 >= v16:
        if (v19 % (2 * v16)) < v16:
            v20 = chars[v18]
            chars[v18] = chars[v18 - v16]
            chars[v18 - v16] = v20
        v19 += 1
        v18 -= 1
    return ''.join(chars)


def func1001(chars):
    key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    chars = list(chars)
    Len = len(chars)
    v3 = 3
    v4 = int(4 * (int(Len / 3)) + 4)
    v5 = Len % 3
    if Len == 3 * (int(Len / 3)):
        v4 = int(4 * (int(Len / 3)))
    result = list()
    v7 = 0
    for _ in range(v4):
        result.append(0)
    if v4 - 2 > 0:
        v3 = v4 + 1
    v8 = v3 & 4294967292
    v9 = 2
    while v7 < (v4 - 2):
        v10 = ord(chars[v9 - 2])
        result[v7] = key[v10 >> 2]
        v11 = ord(chars[v9 - 1])
        v12 = v11 & 15
        v13 = (v11 >> 4) | (16 * (v10 & 3))
        v14_index = v7
        v7 += 4
        result[v14_index + 1] = key[v13]
        # v15 = *v9
        if v9 >= Len:  # v15本是指针这里要特别注意
            v15 = 0
        else:
            v15 = ord(chars[v9])
        v9 += 3
        v16 = v15 & 63
        v15 = key[(v15 >> 6) | (4 * v12)]
        result[v14_index + 3] = key[v16]
        result[v14_index + 2] = v15
    if v5 != 2:
        if v5 != 1:
            return ''.join(result)
        result[v8 - 2] = '='
    result[v8 - 1] = '='
    return ''.join(result)


def func1003(chars):
    chars = list(chars)
    Len = len(chars)
    for i in range(Len):
        v4 = ord(chars[i])
        if v4 == 43:
            v5 = 45
        else:
            if v4 != 47:
                continue
            v5 = 95
        chars[i] = chr(v5)
    return ''.join(chars)


def func(chars):
    """这里还有一个判断得到参数v8, v6, v9
    与版本号v1有关，这里就直接把值固定3,1,5"""
    chars = func41(chars)
    chars = func42(chars)
    chars = func43(chars)
    chars = func1001(chars)
    chars = func1003(chars)
    return chars


def getD(imei, uid, product, version, pla, tm, alg, key):
    try:
        # 字符串拼接过程
        chars = imei + uid + product + version + 'sjdh203nLK034dkVDka2' + pla + tm + alg + key
        # 随机生成key
        rand_k = randomKey()
        chars = chars + rand_k
        # 标准md5
        hex_output = hashlib.md5(chars.encode()).hexdigest()
        _chars = rand_k + hex_output + key
        # 凯撒加密+base64
        return func(_chars)
    except Exception as e:
        print('d参数计算错误: %s' % str(e))


if __name__ == '__main__':
    print(md5('a27fc8e7862a6297210.0.1androidsjdh203nLK034dkVDka21630568347236v1842dIb5aAHnjN15wki44ia25iW65M1C04tVbFxgZ24bWE5G37VYgBdjzC0VUvj57aD8e7i4uSvY49y9jcH32y57d554MwlOOK4l9dYE1dVmW2n2c711waSX81Wm42032rF5Xzw0ajq36E45q'))