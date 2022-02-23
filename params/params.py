import uuid
import random
import hashlib

def getImei():
    """uuid生成的imei"""
    _uid = str(uuid.uuid4())
    imei = _uid[:8] + _uid[9:13] + _uid[14:18] + _uid[19:23] + _uid[24:]
    return imei

def realImei():
    """可过验证的imei"""
    TAC = [8, 6] + [random.randint(1, 9) for _ in range(6)]
    SNR = [random.randint(1, 9) for _ in range(6)]
    check = TAC + SNR
    evens = [str(n * 2) for n in check[1::2]]
    sums = []
    for i in evens:
        if len(i) >= 2:
            i = list(i)
            sums += [int(n) for n in i]
        else:
            sums.append(int(i))
    checks = ((sum(sums) + sum(check[::2])) // 10 + 1) * 10 - (sum(sums) + sum(check[::2]))
    if checks == 10:
        checks = 0
    imei = ''.join([str(n) for n in check]) + str(checks)
    return imei

def uidImei():
    """uuid"""
    return uuid.uuid4()

def randomA():
    """encrypt传入的a参数"""
    chr_list = list()
    for _ in range(15):
        f_num = random.randint(0, 3-1)
        if f_num != 0:
            if f_num == 1:
                f_num = random.randint(0, 25-1) + 65
            elif f_num == 2:
                f_num = random.randint(0, 25-1) + 97
            chr_list.append(chr(f_num))
        else:
            chr_list.append(str(random.randint(0, 10-1)))
    return ''.join(chr_list)

def md5value(key):
    input_name = hashlib.md5()
    input_name.update(key.encode("utf-8"))
    return (input_name.hexdigest()).lower()


if __name__ == '__main__':
    print(md5value('a27fc8e7862a6297210.0.1androidsjdh203nLK034dkVDka21630387321944v1T0D979H4y9iJhMl4qsyQ4R8o520JJxFQfBaIy58t7862GQiI9q53dS9O9rOZ7IBUewqND422nJTZBacemS0Zo1rDJ71x19ZDk51O3Gnr8AKvA8kMyh9XwWpHq4m3e9glekrlM578xVCVf9lt'))
