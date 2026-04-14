// HJ RFI — Hijack Raise First In (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ RFI",
  description: "Hijack raise first in — 6-max, 100bb",
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
      raise: "[3.9408600000000003]JhTd, JhTs, JhTc, JdTh, JdTs, JdTc, JsTh, JsTd, JsTc, JcTh, JcTd, JcTs[/3.9408600000000003], [4.61595]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/4.61595], [8.29864]Th8h, Td8d, Ts8s, Tc8c[/8.29864], [9.02593]Ah8d, Ah8s, Ah8c, Ad8h, Ad8s, Ad8c, As8h, As8d, As8c, Ac8h, Ac8d, Ac8s[/9.02593], [9.1999]8h7h, 8d7d, 8s7s, 8c7c[/9.1999], [22.6385]7h6h, 7d6d, 7s6s, 7c6c[/22.6385], [23.799200000000003]Ah5d, Ah5s, Ah5c, Ad5h, Ad5s, Ad5c, As5h, As5d, As5c, Ac5h, Ac5d, Ac5s[/23.799200000000003], [24.8569]6h5h, 6d5d, 6s5s, 6c5c[/24.8569], [26.5157]5h4h, 5d4d, 5s4s, 5c4c[/26.5157], [27.0005]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/27.0005], [28.4041]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/28.4041], [31.281599999999997]9h8h, 9d8d, 9s8s, 9c8c[/31.281599999999997], [39.949]QhTd, QhTs, QhTc, QdTh, QdTs, QdTc, QsTh, QsTd, QsTc, QcTh, QcTd, QcTs[/39.949], [54.5558]Kh4h, Kd4d, Ks4s, Kc4c[/54.5558], [71.58149999999999]Ah9d, Ah9s, Ah9c, Ad9h, Ad9s, Ad9c, As9h, As9d, As9c, Ac9h, Ac9d, Ac9s[/71.58149999999999], [80.7309]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/80.7309], [96.05550000000001]Qh8h, Qd8d, Qs8s, Qc8c[/96.05550000000001], [99.9988]Kh5h, Kd5d, Ks5s, Kc5c[/99.9988], [99.9992]KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs[/99.9992], [99.9999]Kh6h, Kd6d, Ks6s, Kc6c[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs, AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs, AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs, KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs, AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs, QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs, AhJh, AdJd, AsJs, AcJc, KhJh, KdJd, KsJs, KcJc, QhJh, QdJd, QsJs, QcJc, JdJh, JsJh, JcJh, JsJd, JcJd, JcJs, AhTh, AdTd, AsTs, AcTc, KhTh, KdTd, KsTs, KcTc, QhTh, QdTd, QsTs, QcTc, JhTh, JdTd, JsTs, JcTc, TdTh, TsTh, TcTh, TsTd, TcTd, TcTs, Ah9h, Ad9d, As9s, Ac9c, Kh9h, Kd9d, Ks9s, Kc9c, Qh9h, Qd9d, Qs9s, Qc9c, Jh9h, Jd9d, Js9s, Jc9c, Th9h, Td9d, Ts9s, Tc9c, 9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s, Ah8h, Ad8d, As8s, Ac8c, Kh8h, Kd8d, Ks8s, Kc8c, 8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s, Ah7h, Ad7d, As7s, Ac7c, Kh7h, Kd7d, Ks7s, Kc7c, 7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s, Ah6h, Ad6d, As6s, Ac6c, 6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s, Ah5h, Ad5d, As5s, Ac5c, Ah4h, Ad4d, As4s, Ac4c, Ah3h, Ad3d, As3s, Ac3c, Ah2h, Ad2d, As2s, Ac2c",
      call: "",
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
