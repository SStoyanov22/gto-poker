// BTN vs sqz UTG+SB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz UTG+SB (RFI fold)",
  description: "BTN cold called UTG, faces SB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[9.29183341]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/9.29183341], [11.75693839]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/11.75693839], [50.194560259999996]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/50.194560259999996]"
      },
      call: {
        '15bb': "[1.13571579]Ah5h, Ad5d, As5s, Ac5c[/1.13571579], [1.43383796]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/1.43383796], [2.2739184900000002]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.2739184900000002], [2.7108451]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.7108451], [2.8143682400000003]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/2.8143682400000003], [3.63661219]KhJh, KdJd, KsJs, KcJc[/3.63661219], [4.37856309]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.37856309], [5.31771707]7h6h, 7d6d, 7s6s, 7c6c[/5.31771707], [6.1380649]Th9h, Td9d, Ts9s, Tc9c[/6.1380649], [6.3238631000000005]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.3238631000000005], [6.68732342]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/6.68732342], [7.10901887]5h4h, 5d4d, 5s4s, 5c4c[/7.10901887], [7.114662099999999]6h5h, 6d5d, 6s5s, 6c5c[/7.114662099999999], [7.559656939999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/7.559656939999999], [7.94976161]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.94976161], [13.716866589999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/13.716866589999999], [21.1061306]AhJh, AdJd, AsJs, AcJc[/21.1061306], [21.6239119]KhQh, KdQd, KsQs, KcQc[/21.6239119], [24.49477787]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/24.49477787], [33.6592]AhQh, AdQd, AsQs, AcQc[/33.6592]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
