def enc(imei, uid, version, platform, timestamp, alg, key):
    imei_len = len(imei)
    uid_len = imei_len + len(uid)
    version_len = uid_len + len(version)
    platform_len = version_len + len(platform)
    timestamp_len = platform_len + len(timestamp)
    alg_len = timestamp_len + len(alg)
    key_len = alg_len + len(key)
    v20 = (key_len + 156) & 4294967288