// CO vs sqz UTG+SB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz UTG+SB (RFI fold)",
  description: "CO cold called UTG, faces SB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[1.89530745]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.89530745], [15.4618399]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/15.4618399], [15.73913524]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/15.73913524], [16.58512645]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/16.58512645]"
      },
      call: {
        '11bb' : "[1.0296060200000001]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/1.0296060200000001], [1.3715098000000001]Th9h, Td9d, Ts9s, Tc9c[/1.3715098000000001], [1.4556615]AhTh, AdTd, AsTs, AcTc[/1.4556615], [1.7041286999999998]Ah5h, Ad5d, As5s, Ac5c[/1.7041286999999998], [1.7894600999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.7894600999999999], [2.29548885]7h6h, 7d6d, 7s6s, 7c6c[/2.29548885], [2.4511669400000002]8h7h, 8d7d, 8s7s, 8c7c[/2.4511669400000002], [3.5092418899999998]KhTh, KdTd, KsTs, KcTc[/3.5092418899999998], [4.23899371]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.23899371], [4.39606285]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/4.39606285], [4.680173549999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.680173549999999], [5.22326915]AhJh, AdJd, AsJs, AcJc[/5.22326915], [7.251444960000001]5h4h, 5d4d, 5s4s, 5c4c[/7.251444960000001], [7.285553429999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/7.285553429999999], [7.3751630100000005]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/7.3751630100000005], [7.40194591]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/7.40194591], [7.43796994]KhJh, KdJd, KsJs, KcJc[/7.43796994], [7.95213458]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.95213458], [8.26034334]6h5h, 6d5d, 6s5s, 6c5c[/8.26034334], [8.32032742]KhQh, KdQd, KsQs, KcQc[/8.32032742], [10.825198499999999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/10.825198499999999], [22.66083107]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/22.66083107], [36.76132648]AhQh, AdQd, AsQs, AcQc[/36.76132648]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
