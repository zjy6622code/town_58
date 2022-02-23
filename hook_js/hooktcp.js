function LogPrint(log) {
    var theDate = new Date();
    var hour = theDate.getHours();
    var minute = theDate.getMinutes();
    var second = theDate.getSeconds();
    var mSecond = theDate.getMilliseconds();

    hour < 10 ? hour = "0" + hour : hour;
    minute < 10 ? minute = "0" + minute : minute;
    second < 10 ? second = "0" + second : second;
    mSecond < 10 ? mSecond = "00" + mSecond : mSecond < 100 ? mSecond = "0" + mSecond : mSecond;
    var time = hour + ":" + minute + ":" + second + ":" + mSecond;
    var threadid = Process.getCurrentThreadId();
    console.log("[" + time + "]" + "->threadid:" + threadid + "--" + log);

}

function printJavaStack(name) {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception");
        var ins = Exception.$new("Exception");
        var straces = ins.getStackTrace();
        if (straces != undefined && straces != null) {
            var strace = straces.toString();
            var replaceStr = strace.replace(/,/g, " \n ");
            LogPrint("=============================" + name + " Stack strat=======================");
            LogPrint(replaceStr);
            LogPrint("=============================" + name + " Stack end======================= \n ");
            Exception.$dispose();
        }
    });
}

function isprintable(value) {
    if (value >= 32 && value <= 126) {
        return true;
    }
    return false;
}

function hooktcp() {
    Java.perform(function () {
        var SocketClass = Java.use('java.net.Socket');
        SocketClass.$init.overload('java.lang.String', 'int').implementation = function (arg0, arg1) {
            console.log("[" + Process.getCurrentThreadId() + "]new Socket connection:" + arg0 + ",port:" + arg1);
            printJavaStack('tcp connect...')
            return this.$init(arg0, arg1);
        }
        var SocketInputStreamClass = Java.use('java.net.SocketInputStream');
        //socketRead0
        SocketInputStreamClass.socketRead0.implementation = function (arg0, arg1, arg2, arg3, arg4) {
            var size = this.socketRead0(arg0, arg1, arg2, arg3, arg4);
            //console.log("[" + Process.getCurrentThreadId() + "]socketRead0:size:" + size + ",content:" + JSON.stringify(arg1));
            var bytearray = Java.array('byte', arg1);
            var content = '';
            for (var i = 0; i < size; i++) {
                if (isprintable(bytearray[i])) {
                    content = content + String.fromCharCode(bytearray[i]);
                }
            }
            var socketimpl = this.impl.value;
            var address = socketimpl.address.value;
            var port = socketimpl.port.value;

            console.log("\naddress:" + address + ",port" + port + "\n" + JSON.stringify(this.socket.value) + "\n[" + Process.getCurrentThreadId() + "]receive:" + content);
            printJavaStack('socketRead0')
            return size;
        }
        var SocketOutPutStreamClass = Java.use('java.net.SocketOutputStream');
        SocketOutPutStreamClass.socketWrite0.implementation = function (arg0, arg1, arg2, arg3) {
            var result = this.socketWrite0(arg0, arg1, arg2, arg3);
            //console.log("[" + Process.getCurrentThreadId() + "]socketWrite0:len:" + arg3 + "--content:" + JSON.stringify(arg1));
            var bytearray = Java.array('byte', arg1);
            var content = '';
            for (var i = 0; i < arg3; i++) {

                if (isprintable(bytearray[i])) {
                    content = content + String.fromCharCode(bytearray[i]);
                }
            }
            var socketimpl = this.impl.value;
            var address = socketimpl.address.value;
            var port = socketimpl.port.value;
            console.log("send address:" + address + ",port" + port + "[" + Process.getCurrentThreadId() + "]send:" + content);
            console.log("\n" + JSON.stringify(this.socket.value) + "\n[" + Process.getCurrentThreadId() + "]send:" + content);
            printJavaStack('socketWrite0')
            return result;
        }
    })
}

function main() {
    hooktcp();
}

setImmediate(main)