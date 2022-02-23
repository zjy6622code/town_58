import logging
import posixpath
import sys

import capstone
from unicorn.arm_const import UC_ARM_REG_PC, UC_ARM_REG_R0
from androidemu.emulator import Emulator
from androidemu.utils import memory_helpers
from unicorn import UC_HOOK_CODE

# Configure logging
logging.basicConfig(
    stream=sys.stdout,
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)7s %(name)34s | %(message)s"
)

logger = logging.getLogger(__name__)

# Initialize emulator
emulator = Emulator(
    vfp_inst_set=True,
    vfs_root=posixpath.join(posixpath.dirname(__file__), "vfs")
)
emulator.load_library("libc.so", do_init=False)
lib_module = emulator.load_library("libGoldSheldClient.so", do_init=False)

# Show loaded modules.
logger.info("Loaded modules:")

for module in emulator.modules:
    logger.info("[0x%x] %s" % (module.base, module.filename))

# Add debugging.
def hook_code(mu, address, size, user_data):
    CP = capstone.Cs(capstone.CS_ARCH_ARM, capstone.CS_MODE_THUMB)
    instruction = mu.mem_read(address, size)
    asCode = CP.disasm(instruction, 0, len(instruction))
    asCode_str = ' '.join([x.mnemonic + ' ' + x.op_str for x in asCode])
    instruction_str = ''.join('{:02x} '.format(x) for x in instruction)

    print('# Tracing instruction at 0x%x, instruction size = 0x%x, instruction = %s, asCode = %s' % (
    address, size, instruction_str, asCode_str))


emulator.mu.hook_add(UC_HOOK_CODE, hook_code)

def aEncrypt(result=None):
    # result_ = emulator.call_native(lib_module.base + 0x0ee4 + 1, 'lo11ll11', 'a27fc8e7862a6297', '', '2', '10.0.1',
    #                               'android', '1630034415471', 'v1', '1k7P0CCp8BCKHq3y')

    result = emulator.call_symbol(lib_module, 'lo11ll1l', emulator.java_vm.jni_env.address_ptr, 0,
                                  'com.wuba.town.client', '4cd151faeacaf4e032ef40aab0422e46', 'online',
                                  'a27fc8e7862a6297', '', '2', '10.0.1', 'android', '1630034415471', 'v1',
                                  '1k7P0CCp8BCKHq3y')
    # print(memory_helpers.read_utf8(emulator.mu, emulator.mu.reg_read(UC_ARM_REG_PC)))
    # print(memory_helpers.read_utf8(emulator.mu, emulator.mu.reg_read(UC_ARM_REG_R0)))
    if not result:
        logger.warning(f'result return none')
        return None
    logger.debug(f'Get res => {result}')
    return result


if __name__ == '__main__':
    res = aEncrypt()
    # print('res:', res)