// SB vs UTG+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs UTG+BTN",
  description: "SB faces UTG raise + BTN call — 6-max, 100bb",
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
        '15bb': "[2.62942]Kh4h, Kd4d, Ks4s, Kc4c[/2.62942], [4.93058]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.93058], [7.021529999999999]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.021529999999999], [8.99563]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/8.99563], [9.424159999999999]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/9.424159999999999], [9.59009]KhTh, KdTd, KsTs, KcTc[/9.59009], [12.4148]6h5h, 6d5d, 6s5s, 6c5c[/12.4148], [18.9226]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/18.9226], [20.4641]Kh6h, Kd6d, Ks6s, Kc6c[/20.4641], [23.3113]Ah3h, Ad3d, As3s, Ac3c[/23.3113], [28.1137]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/28.1137], [30.1678]AhQh, AdQd, AsQs, AcQc[/30.1678], [40.876200000000004]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/40.876200000000004], [52.85530000000001]Ah4h, Ad4d, As4s, Ac4c[/52.85530000000001], [69.1665]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/69.1665], [77.4462]Ah5h, Ad5d, As5s, Ac5c[/77.4462], [83.7749]AhJh, AdJd, AsJs, AcJc[/83.7749], [93.5004]QhJh, QdJd, QsJs, QcJc[/93.5004], [93.5006]KhQh, KdQd, KsQs, KcQc[/93.5006], [99.6694]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/99.6694], [99.9445]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/99.9445], [99.9642]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.9642], [99.9819]KhJh, KdJd, KsJs, KcJc[/99.9819], [99.9995]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9995], [99.9996]AhKh, AdKd, AsKs, AcKc[/99.9996], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs"
      },
      call: {
        '2.5bb': "[0.652552]QhTh, QdTd, QsTs, QcTc[/0.652552], [0.7100730000000001]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/0.7100730000000001], [2.51465]Ah9h, Ad9d, As9s, Ac9c[/2.51465], [3.84139]8h7h, 8d7d, 8s7s, 8c7c[/3.84139], [4.59928]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/4.59928], [5.09919]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/5.09919], [6.4781699999999995]QhJh, QdJd, QsJs, QcJc[/6.4781699999999995], [6.4994]KhQh, KdQd, KsQs, KcQc[/6.4994], [7.852829999999999]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/7.852829999999999], [9.922179999999999]Th9h, Td9d, Ts9s, Tc9c[/9.922179999999999], [12.8419]Ah3h, Ad3d, As3s, Ac3c[/12.8419], [16.222]AhJh, AdJd, AsJs, AcJc[/16.222], [17.6322]6h5h, 6d5d, 6s5s, 6c5c[/17.6322], [19.616]7h6h, 7d6d, 7s6s, 7c6c[/19.616], [20.6005]Ah5h, Ad5d, As5s, Ac5c[/20.6005], [21.7732]5h4h, 5d4d, 5s4s, 5c4c[/21.7732], [24.5918]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/24.5918], [25.9402]KhTh, KdTd, KsTs, KcTc[/25.9402], [26.5863]JhTh, JdTd, JsTs, JcTc[/26.5863], [26.989]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/26.989], [30.787599999999998]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/30.787599999999998], [32.8511]Ah4h, Ad4d, As4s, Ac4c[/32.8511], [34.0066]AhTh, AdTd, AsTs, AcTc[/34.0066], [40.062599999999996]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/40.062599999999996], [46.7333]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/46.7333], [69.8322]AhQh, AdQd, AsQs, AcQc[/69.8322], [81.0772]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/81.0772], [91.0042]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/91.0042]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
