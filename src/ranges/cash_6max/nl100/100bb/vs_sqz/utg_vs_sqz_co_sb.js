// UTG vs sqz CO+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs sqz CO+SB",
  description: "UTG faces squeeze — CO called, SB squeezed — 6-max, 100bb",
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
        '30bb': "[0.655682]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/0.655682], [0.776321]AhTh, AdTd, AsTs, AcTc[/0.776321], [0.815795]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/0.815795], [0.8718210000000001]Ah2h, Ad2d, As2s, Ac2c[/0.8718210000000001], [3.15053]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/3.15053], [3.2569399999999997]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/3.2569399999999997], [3.5025399999999998]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/3.5025399999999998], [4.1535534499999995]Kh7h, Kd7d, Ks7s, Kc7c[/4.1535534499999995], [5.02081983]Kh8h, Kd8d, Ks8s, Kc8c[/5.02081983], [5.9986999999999995]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/5.9986999999999995], [6.10036]KhJh, KdJd, KsJs, KcJc[/6.10036], [6.65319]Ah3h, Ad3d, As3s, Ac3c[/6.65319], [11.8607]Ah4h, Ad4d, As4s, Ac4c[/11.8607], [12.653500000000001]Kh9h, Kd9d, Ks9s, Kc9c[/12.653500000000001], [20.014000000000003]AhKh, AdKd, AsKs, AcKc[/20.014000000000003], [20.426]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/20.426], [40.0643]KhTh, KdTd, KsTs, KcTc[/40.0643], [70.611]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/70.611]",
        '100bb': "[3.10785]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.10785], [13.0336]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/13.0336], [37.4032]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/37.4032], [79.9859]AhKh, AdKd, AsKs, AcKc[/79.9859], [81.1387]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/81.1387], [88.29599999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/88.29599999999999]"
      },
      call: {
        '15bb': "[1.56990214]Th9h, Td9d, Ts9s, Tc9c[/1.56990214], [2.4333899999999997]Ah4h, Ad4d, As4s, Ac4c[/2.4333899999999997], [3.01479084]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.01479084], [3.9570951200000004]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.9570951200000004], [5.70529]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/5.70529], [6.24465]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/6.24465], [7.57086]KhQh, KdQd, KsQs, KcQc[/7.57086], [7.91963]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.91963], [8.35645]Ah5h, Ad5d, As5s, Ac5c[/8.35645], [11.1271704]7h6h, 7d6d, 7s6s, 7c6c[/11.1271704], [12.569711210000001]6h5h, 6d5d, 6s5s, 6c5c[/12.569711210000001], [12.8]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/12.8], [13.1152]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/13.1152], [14.43591118]5h4h, 5d4d, 5s4s, 5c4c[/14.43591118], [15.3588]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/15.3588], [16.3554]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/16.3554], [18.467]KhJh, KdJd, KsJs, KcJc[/18.467], [30.561700000000002]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/30.561700000000002], [42.1708]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/42.1708], [97.937]AhQh, AdQd, AsQs, AcQc[/97.937]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
