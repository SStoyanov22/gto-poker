// BTN RFI — Button Raise First In (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN RFI",
  description: "Button raise first in — 6-max, 100bb",
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
      raise: "[12.1167]Ah2d, Ah2s, Ah2c, Ad2h, Ad2s, Ad2c, As2h, As2d, As2c, Ac2h, Ac2d, Ac2s[/12.1167], [17.474999999999998]Jh8d, Jh8s, Jh8c, Jd8h, Jd8s, Jd8c, Js8h, Js8d, Js8c, Jc8h, Jc8d, Jc8s[/17.474999999999998], [21.01]9h8d, 9h8s, 9h8c, 9d8h, 9d8s, 9d8c, 9s8h, 9s8d, 9s8c, 9c8h, 9c8d, 9c8s[/21.01], [23.9607]6h4h, 6d4d, 6s4s, 6c4c[/23.9607], [47.1327]Kh7d, Kh7s, Kh7c, Kd7h, Kd7s, Kd7c, Ks7h, Ks7d, Ks7c, Kc7h, Kc7d, Kc7s[/47.1327], [68.882]Th8d, Th8s, Th8c, Td8h, Td8s, Td8c, Ts8h, Ts8d, Ts8c, Tc8h, Tc8d, Tc8s[/68.882], [94.9634]Kh8d, Kh8s, Kh8c, Kd8h, Kd8s, Kd8c, Ks8h, Ks8d, Ks8c, Kc8h, Kc8d, Kc8s[/94.9634], [99.9892]Jh4h, Jd4d, Js4s, Jc4c[/99.9892], [99.99]Qh2h, Qd2d, Qs2s, Qc2c[/99.99], [99.9997]9h6h, 9d6d, 9s6s, 9c6c[/99.9997], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs, AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs, AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs, Ah9d, Ah9s, Ah9c, Ad9h, Ad9s, Ad9c, As9h, As9d, As9c, Ac9h, Ac9d, Ac9s, Ah8d, Ah8s, Ah8c, Ad8h, Ad8s, Ad8c, As8h, As8d, As8c, Ac8h, Ac8d, Ac8s, Ah7d, Ah7s, Ah7c, Ad7h, Ad7s, Ad7c, As7h, As7d, As7c, Ac7h, Ac7d, Ac7s, Ah6d, Ah6s, Ah6c, Ad6h, Ad6s, Ad6c, As6h, As6d, As6c, Ac6h, Ac6d, Ac6s, Ah5d, Ah5s, Ah5c, Ad5h, Ad5s, Ad5c, As5h, As5d, As5c, Ac5h, Ac5d, Ac5s, Ah4d, Ah4s, Ah4c, Ad4h, Ad4s, Ad4c, As4h, As4d, As4c, Ac4h, Ac4d, Ac4s, Ah3d, Ah3s, Ah3c, Ad3h, Ad3s, Ad3c, As3h, As3d, As3c, Ac3h, Ac3d, Ac3s, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs, KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs, KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs, Kh9d, Kh9s, Kh9c, Kd9h, Kd9s, Kd9c, Ks9h, Ks9d, Ks9c, Kc9h, Kc9d, Kc9s, AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs, QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs, QhTd, QhTs, QhTc, QdTh, QdTs, QdTc, QsTh, QsTd, QsTc, QcTh, QcTd, QcTs, Qh9d, Qh9s, Qh9c, Qd9h, Qd9s, Qd9c, Qs9h, Qs9d, Qs9c, Qc9h, Qc9d, Qc9s, AhJh, AdJd, AsJs, AcJc, KhJh, KdJd, KsJs, KcJc, QhJh, QdJd, QsJs, QcJc, JdJh, JsJh, JcJh, JsJd, JcJd, JcJs, JhTd, JhTs, JhTc, JdTh, JdTs, JdTc, JsTh, JsTd, JsTc, JcTh, JcTd, JcTs, Jh9d, Jh9s, Jh9c, Jd9h, Jd9s, Jd9c, Js9h, Js9d, Js9c, Jc9h, Jc9d, Jc9s, AhTh, AdTd, AsTs, AcTc, KhTh, KdTd, KsTs, KcTc, QhTh, QdTd, QsTs, QcTc, JhTh, JdTd, JsTs, JcTc, TdTh, TsTh, TcTh, TsTd, TcTd, TcTs, Th9d, Th9s, Th9c, Td9h, Td9s, Td9c, Ts9h, Ts9d, Ts9c, Tc9h, Tc9d, Tc9s, Ah9h, Ad9d, As9s, Ac9c, Kh9h, Kd9d, Ks9s, Kc9c, Qh9h, Qd9d, Qs9s, Qc9c, Jh9h, Jd9d, Js9s, Jc9c, Th9h, Td9d, Ts9s, Tc9c, 9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s, Ah8h, Ad8d, As8s, Ac8c, Kh8h, Kd8d, Ks8s, Kc8c, Qh8h, Qd8d, Qs8s, Qc8c, Jh8h, Jd8d, Js8s, Jc8c, Th8h, Td8d, Ts8s, Tc8c, 9h8h, 9d8d, 9s8s, 9c8c, 8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s, Ah7h, Ad7d, As7s, Ac7c, Kh7h, Kd7d, Ks7s, Kc7c, Qh7h, Qd7d, Qs7s, Qc7c, Jh7h, Jd7d, Js7s, Jc7c, Th7h, Td7d, Ts7s, Tc7c, 9h7h, 9d7d, 9s7s, 9c7c, 8h7h, 8d7d, 8s7s, 8c7c, 7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s, Ah6h, Ad6d, As6s, Ac6c, Kh6h, Kd6d, Ks6s, Kc6c, Qh6h, Qd6d, Qs6s, Qc6c, Jh6h, Jd6d, Js6s, Jc6c, Th6h, Td6d, Ts6s, Tc6c, 8h6h, 8d6d, 8s6s, 8c6c, 7h6h, 7d6d, 7s6s, 7c6c, 6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s, Ah5h, Ad5d, As5s, Ac5c, Kh5h, Kd5d, Ks5s, Kc5c, Qh5h, Qd5d, Qs5s, Qc5c, Jh5h, Jd5d, Js5s, Jc5c, 7h5h, 7d5d, 7s5s, 7c5c, 6h5h, 6d5d, 6s5s, 6c5c, 5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s, Ah4h, Ad4d, As4s, Ac4c, Kh4h, Kd4d, Ks4s, Kc4c, Qh4h, Qd4d, Qs4s, Qc4c, 5h4h, 5d4d, 5s4s, 5c4c, 4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s, Ah3h, Ad3d, As3s, Ac3c, Kh3h, Kd3d, Ks3s, Kc3c, Qh3h, Qd3d, Qs3s, Qc3c, 3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s, Ah2h, Ad2d, As2s, Ac2c, Kh2h, Kd2d, Ks2s, Kc2c, 2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s",
      call: "",
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
