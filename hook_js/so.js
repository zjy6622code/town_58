function func2(){
    Java.perform(function(){
        var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
        console.log('基地址: ' + soAddr);
        var FinalAddr = soAddr.add(0x269c + 1);
        console.log('绝对地址: ' + FinalAddr);
        Interceptor.attach(FinalAddr, {
            onEnter: function(args){
                console.log('length:', args[0].toInt32())
            },
            onLeave: function(retval){
                console.log('res:\n' + retval.readCString() + '\n' + hexdump(retval))
            }
        });
    });
}

function func3(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    console.log('基地址: ' + soAddr);
    var FinalAddr = soAddr.add(0x2620 + 1);
    console.log('绝对地址: ' + FinalAddr);
    var resultPtr = null
    Interceptor.attach(FinalAddr, {
        onEnter: function(args){
            console.log('func2 args:', args[0].readCString())
            resultPtr = args[1];
            console.log(resultPtr.readCString())
//            console.log(hexdump(resultPtr, {
//                offset: 0,
//                length: 8,
//                header: true,
//                ansi: false
//            }));
        },
        onLeave: function(retval){
            var buffer = Memory.readByteArray(resultPtr, 32);
//            console.log(buffer.readCString())
            console.log(hexdump(buffer, {
                offset: 0,
                length: 32,
                header: true,
                ansi: false
            }));
        }
    });
}

function encrypt(){
    Java.perform(function(){
        var sdk = Java.use("com.bj58.tzcommon.util.goldsheld.lib.jni.GoldSheldClient");
        sdk.encrypt.implementation = function(){
            for (var i=0;i<arguments.length;i++){
                console.log(`arg${i}: ${arguments[i]}`)
            }
            var res = this.encrypt.apply(this, arguments)
            console.log('encrypt:', res)
            return res
        };
    })
}


function so_md5(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var NewStringUTF_addr = soAddr.add(0x2620 + 1);
    var s = ptr("111111")
    var hex = ptr("1111")
    var s_md5 = new NativeFunction(NewStringUTF_addr,"void",["pointer","pointer"])
    console.log(s_md5(s, hex))
}


function _strcat(){
    var strcat_addr = Module.findExportByName("libc.so", "strcat");
    Interceptor.attach(strcat_addr, {
        onEnter:function(args){
           console.log('strcat_arg1:' + args[0].readCString() + ' | ' + 'arg2:' + args[1].readCString())
        },onLeave:function(retval){
            console.log("res:["+ retval.readCString() + ']')
            console.log("\n")
        }
    })
}

function _sprintf(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    console.log('基地址: ' + soAddr);
    var FinalAddr = soAddr.add(0x0c80 + 1);
    console.log('绝对地址: ' + FinalAddr);
    Interceptor.attach(FinalAddr, {
        onEnter:function(args){
            console.log(JSON.stringify(args))
//            console.log(args)
        },
        onLeave:function(retval){
            console.log(retval)
//            console.log("res:["+ retval.readCString() + ']')
//            console.log("\n")
        }
    })
}


function md5_finish(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var FinalAddr = soAddr.add(0x2188 + 1);
    var resultPtr = null
    Interceptor.attach(FinalAddr, {
        onEnter: function(args){
            console.log('md5_finish args1:', args[0])
            console.log('md5_finish args2:', args[1])
            resultPtr = args[1]
        },
        onLeave: function(retval){
            console.log('res:\n', resultPtr, hexdump(resultPtr, {
                offset: 0,
                length: 16,
                header: true,
                ansi: false
            }))
        }
    });
}


function func4(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var FinalAddr = soAddr.add(0x2220 + 1);
    Interceptor.attach(FinalAddr, {
        onEnter: function(args){
            console.log('fun4 v30:', args[0].readCString())
            console.log('fun4 alg:', args[1].readCString())
        },
        onLeave: function(retval){
            console.log('fun4 res:', retval.readCString())
        }
    });
}


function func4_(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var v12 = soAddr.add(0x248A + 1)
//    console.log('v12:', v12.readCString())
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var FinalAddr1 = soAddr.add(0x22A8 + 1);
    Interceptor.attach(FinalAddr1, {
        onEnter: function(args){
            console.log('fun41 v30:', args[0].readCString())
            console.log('fun41 alg:', args[1].toInt32())
        },
        onLeave: function(retval){
//            console.log('fun41 res:', retval.readCString())
        }
    });
    var FinalAddr2 = soAddr.add(0x2318 + 1);
    Interceptor.attach(FinalAddr2, {
        onEnter: function(args){
            console.log('fun42 v30:', args[0].readCString())
            console.log('fun42 alg:', args[1].toInt32())
        },
        onLeave: function(retval){
//            console.log('fun42 res:', retval.readCString())
        }
    });
    var FinalAddr3 = soAddr.add(0x23F4 + 1);
    Interceptor.attach(FinalAddr3, {
        onEnter: function(args){
            console.log('v12:', v12.readCString())
            console.log('fun43 v30:', args[0].readCString())
            console.log('fun43 alg:', args[1].toInt32())
        },
        onLeave: function(retval){
            console.log('v12:', v12.readCString())
//            console.log('fun43 res:', retval.readCString())
        }
    });
//    var v12 = soAddr.add(0x2448)
//    console.log('v12:',hexdump(v12))
}

function _1914(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
//    console.log(soAddr)
    var FinalAddr = soAddr.add(0x1914 + 1);
    Interceptor.attach(FinalAddr, {
        onEnter: function(args){
            console.log('func1914 test:', args[0].readCString())
        },
        onLeave: function(retval){
            console.log('func1914 res:', retval.readCString())
        }
    });
}

function func1001(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var FinalAddr = soAddr.add(0x1790 + 1);
    Interceptor.attach(FinalAddr, {
        onEnter: function(args){
            console.log('func1001 str:', args[0].readCString())
        },
        onLeave: function(retval){
            console.log('func1001 res:', retval.readCString())
        }
    });
}

//function func1003(){
//    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
//    var FinalAddr = soAddr.add(0x1928 + 1);
//    Interceptor.attach(FinalAddr, {
//        onEnter: function(args){
//            console.log('func1003 str:', args[0].readCString())
//        },
//        onLeave: function(retval){
//            console.log('func1003 res:', retval.readCString())
//        }
//    });
//}


function st(){
    var soAddr = Module.findBaseAddress("libGoldSheldClient.so");
    var v12 = soAddr.add(0x248A + 1)
    console.log('v12:', v12.readCString())
}
//a27fc8e7862a6297210.0.1androidsjdh203nLK034dkVDka21630303937622v10157kDDSv2XrXuA8GRcJE0sJu432lj62U4Wrt3xf06Vdl7EJCWS03ATtihI8cay18d1cZA5WLE3OE9dj845oBP92twn57XEIWNwl2OritBQ5geFK2sAMj802UF80FWcmf70cVZZZej9tiEZf
//imei("a27fc8e7862a6297") + uid("") + product("2") + version("10.0.1") + platform("android") + sjdh203nLK034dkVDka2 + timestamp(1630303938522) + alg("v1") +