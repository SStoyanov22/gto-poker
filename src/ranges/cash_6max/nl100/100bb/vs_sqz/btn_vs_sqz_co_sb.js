// BTN vs sqz CO+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz CO+SB",
  description: "BTN called CO, faces SB squeeze — 6-max, 100bb",
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
        '100bb': "[0.65451139]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/0.65451139], [0.77510221]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/0.77510221], [1.52771778]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.52771778], [5.53298946]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/5.53298946], [10.82322562]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/10.82322562]"},
      call: {
        '15bb': "[1.78627438]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/1.78627438], [4.63761027]5h4h, 5d4d, 5s4s, 5c4c[/4.63761027], [5.63271564]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/5.63271564], [6.23921258]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/6.23921258], [9.2410889]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/9.2410889], [12.101762019999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/12.101762019999999], [12.36445016]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/12.36445016], [17.886624349999998]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/17.886624349999998], [24.29765702]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/24.29765702], [25.32256898]KhQh, KdQd, KsQs, KcQc[/25.32256898], [30.06813688]AhJh, AdJd, AsJs, AcJc[/30.06813688], [39.59366069]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/39.59366069], [43.133841239999995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/43.133841239999995]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
