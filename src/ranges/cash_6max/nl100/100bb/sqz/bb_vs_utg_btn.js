// BB vs UTG+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BB vs UTG+BTN",
  description: "BB faces UTG raise + BTN call — 6-max, 100bb",
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
        '15bb': "[0.687828]Ah8h, Ad8d, As8s, Ac8c[/0.687828], [1.52243]Kh8h, Kd8d, Ks8s, Kc8c[/1.52243], [1.8869]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/1.8869], [2.34096]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.34096], [2.78878]KhTh, KdTd, KsTs, KcTc[/2.78878], [4.457789999999999]8h7h, 8d7d, 8s7s, 8c7c[/4.457789999999999], [4.67446]Kh5h, Kd5d, Ks5s, Kc5c[/4.67446], [7.2176100000000005]Kh4h, Kd4d, Ks4s, Kc4c[/7.2176100000000005], [8.094949999999999]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/8.094949999999999], [8.615390000000001]Kh7h, Kd7d, Ks7s, Kc7c[/8.615390000000001], [8.75706]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/8.75706], [11.2922]Ah4h, Ad4d, As4s, Ac4c[/11.2922], [11.7887]Kh6h, Kd6d, Ks6s, Kc6c[/11.7887], [14.6545]JhTh, JdTd, JsTs, JcTc[/14.6545], [14.968100000000002]6h5h, 6d5d, 6s5s, 6c5c[/14.968100000000002], [19.5735]5h4h, 5d4d, 5s4s, 5c4c[/19.5735], [23.008100000000002]Ah6h, Ad6d, As6s, Ac6c[/23.008100000000002], [23.6428]Jh8h, Jd8d, Js8s, Jc8c[/23.6428], [24.8092]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/24.8092], [26.2899]Jh9h, Jd9d, Js9s, Jc9c[/26.2899], [27.8805]Kh9h, Kd9d, Ks9s, Kc9c[/27.8805], [34.6192]7h6h, 7d6d, 7s6s, 7c6c[/34.6192], [36.4152]AhJh, AdJd, AsJs, AcJc[/36.4152], [43.3536]Ah2h, Ad2d, As2s, Ac2c[/43.3536], [43.3897]Ah5h, Ad5d, As5s, Ac5c[/43.3897], [45.523599999999995]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/45.523599999999995], [48.5217]Ah3h, Ad3d, As3s, Ac3c[/48.5217], [50.3578]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/50.3578], [58.62270000000001]AhQh, AdQd, AsQs, AcQc[/58.62270000000001], [63.931099999999994]QhJh, QdJd, QsJs, QcJc[/63.931099999999994], [76.2663]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/76.2663], [99.8552]KhJh, KdJd, KsJs, KcJc[/99.8552], [99.873]KhQh, KdQd, KsQs, KcQc[/99.873], [99.9999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs"
      },
      call: {
        '2.5bb': "[15.157200000000001]4h3h, 4d3d, 4s3s, 4c3c[/15.157200000000001], [17.4087]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/17.4087], [23.7337]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/23.7337], [28.1707]Kh9h, Kd9d, Ks9s, Kc9c[/28.1707], [36.0684]QhJh, QdJd, QsJs, QcJc[/36.0684], [38.5806]Ah2h, Ad2d, As2s, Ac2c[/38.5806], [38.882600000000004]9h7h, 9d7d, 9s7s, 9c7c[/38.882600000000004], [40.488600000000005]Th8h, Td8d, Ts8s, Tc8c[/40.488600000000005], [40.5968]7h5h, 7d5d, 7s5s, 7c5c[/40.5968], [41.3765]AhQh, AdQd, AsQs, AcQc[/41.3765], [46.6413]8h6h, 8d6d, 8s6s, 8c6c[/46.6413], [46.9679]Jh9h, Jd9d, Js9s, Jc9c[/46.9679], [49.642199999999995]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/49.642199999999995], [51.4747]Ah3h, Ad3d, As3s, Ac3c[/51.4747], [54.3735]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/54.3735], [56.0052]Ah6h, Ad6d, As6s, Ac6c[/56.0052], [56.6094]Ah5h, Ad5d, As5s, Ac5c[/56.6094], [59.161300000000004]6h4h, 6d4d, 6s4s, 6c4c[/59.161300000000004], [59.3539]9h8h, 9d8d, 9s8s, 9c8c[/59.3539], [63.584300000000006]AhJh, AdJd, AsJs, AcJc[/63.584300000000006], [65.2654]7h6h, 7d6d, 7s6s, 7c6c[/65.2654], [71.6959]5h3h, 5d3d, 5s3s, 5c3c[/71.6959], [80.4264]5h4h, 5d4d, 5s4s, 5c4c[/80.4264], [83.1112]8h7h, 8d7d, 8s7s, 8c7c[/83.1112], [84.8016]Ah7h, Ad7d, As7s, Ac7c[/84.8016], [85.03110000000001]6h5h, 6d5d, 6s5s, 6c5c[/85.03110000000001], [85.3411]JhTh, JdTd, JsTs, JcTc[/85.3411], [88.7076]Ah4h, Ad4d, As4s, Ac4c[/88.7076], [91.2429]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/91.2429], [96.9322]Th9h, Td9d, Ts9s, Tc9c[/96.9322], [97.1796]KhTh, KdTd, KsTs, KcTc[/97.1796], [97.65899999999999]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/97.65899999999999], [98.1131]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/98.1131], [98.7978]Ah8h, Ad8d, As8s, Ac8c[/98.7978], [99.5222]QhTh, QdTd, QsTs, QcTc[/99.5222], [99.8263]Ah9h, Ad9d, As9s, Ac9c[/99.8263], [99.985]AhTh, AdTd, AsTs, AcTc[/99.985], [99.99980000000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/99.99980000000001], [99.9999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs, 5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s, 4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s, 3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/99.9999], 2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
