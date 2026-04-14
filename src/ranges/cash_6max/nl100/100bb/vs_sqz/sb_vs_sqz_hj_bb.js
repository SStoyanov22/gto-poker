// SB vs sqz HJ+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz HJ+BB",
  description: "SB called HJ, faces BB squeeze — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: "",
      call: "",
    },
    '2.25bb': {
      raise: "",
      call: "",
    },
    '2.5bb': {
      raise: {
        '100bb': "[15.37117583]AhQh, AdQd, AsQs, AcQc[/15.37117583], [29.961081299999996]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/29.961081299999996]"
      },
      call: {
        '12bb': "[1.17010883]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/1.17010883], [1.4478955999999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.4478955999999998], [1.52666286]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.52666286], [1.73860474]6h5h, 6d5d, 6s5s, 6c5c[/1.73860474], [2.7004015900000002]AhJh, AdJd, AsJs, AcJc[/2.7004015900000002], [3.5266502300000004]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/3.5266502300000004], [3.58637646]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.58637646], [4.47007108]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.47007108], [6.28051823]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.28051823], [6.858681880000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/6.858681880000001], [7.50208807]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/7.50208807], [8.85686342]KhQh, KdQd, KsQs, KcQc[/8.85686342], [11.274790939999999]AhQh, AdQd, AsQs, AcQc[/11.274790939999999]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
