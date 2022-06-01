import { Interface, keccak256, getCreate2Address } from "ethers/lib/utils";

// NOTE: CALCULATE HASH USING keccack256(/*init code*/) INSTEAD OF HARDCODING?
const JOE_PAIR_INIT_CODE_HASH: string = "0x0bbca9af0511ad1a1da383135cf3a8d2ac620e549ef9f6ae3a4c33c2fed0af91";

export const SWAP_ABI: string = `event Swap(
    address indexed sender,
    uint256 amount0In,
    uint256 amount1In,
    uint256 amount0Out,
    uint256 amount1Out,
    address indexed to
)`;

const GET_RESERVES_ABI: string = `    function getReserves()
    public
    view
    returns (
        uint112 _reserve0,
        uint112 _reserve1,
        uint32 _blockTimestampLast
    )`;

const TOKEN0_ABI: string = "function token0() view returns (address token)";
const TOKEN1_ABI: string = "function token1() view returns (address token)";

export const PAIR_IFACE: Interface = new Interface([TOKEN0_ABI, TOKEN1_ABI, SWAP_ABI, GET_RESERVES_ABI]);

// NOTE: UPDATE BACK TO USE NetworkData
export const create2Pair = (tokenA: string, tokenB: string, factory: string) => {
  let token0, token1;
  tokenA < tokenB ? ((token0 = tokenA), (token1 = tokenB)) : ((token0 = tokenB), (token1 = tokenA));
  const salt: string = keccak256(token0.concat(token1.slice(2)));
  return getCreate2Address(factory, salt, JOE_PAIR_INIT_CODE_HASH).toLowerCase();
};
