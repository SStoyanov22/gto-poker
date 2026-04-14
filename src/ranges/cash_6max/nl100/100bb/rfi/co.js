// CO RFI — Cutoff Raise First In (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO RFI",
  description: "Cutoff raise first in — 6-max, 100bb",
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
      raise: "A[16.724600000000002]Kh2h, Kd2d, Ks2s, Kc2c[/16.724600000000002], [23.4635]Qh5h, Qd5d, Qs5s, Qc5c[/23.4635], [27.2167]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/27.2167], [28.3304]Kh9d, Kh9s, Kh9c, Kd9h, Kd9s, Kd9c, Ks9h, Ks9d, Ks9c, Kc9h, Kc9d, Kc9s[/28.3304], [33.2377]5h4h, 5d4d, 5s4s, 5c4c[/33.2377], [34.341100000000004]Ah7d, Ah7s, Ah7c, Ad7h, Ad7s, Ad7c, As7h, As7d, As7c, Ac7h, Ac7d, Ac7s[/34.341100000000004], [35.446299999999994]6h5h, 6d5d, 6s5s, 6c5c[/35.446299999999994], [35.889900000000004]8h7h, 8d7d, 8s7s, 8c7c[/35.889900000000004], [39.9913]7h6h, 7d6d, 7s6s, 7c6c[/39.9913], [47.9216]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/47.9216], [56.49999999999999]9h7h, 9d7d, 9s7s, 9c7c[/56.49999999999999], [80.9361]Jh7h, Jd7d, Js7s, Jc7c[/80.9361], [82.877]Qh6h, Qd6d, Qs6s, Qc6c[/82.877], [96.24340000000001]Qh7h, Qd7d, Qs7s, Qc7c[/96.24340000000001], [97.764]Ah5d, Ah5s, Ah5c, Ad5h, Ad5s, Ad5c, As5h, As5d, As5c, Ac5h, Ac5d, Ac5s[/97.764], [98.9619]Ah8d, Ah8s, Ah8c, Ad8h, Ad8s, Ad8c, As8h, As8d, As8c, Ac8h, Ac8d, Ac8s[/98.9619], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs, AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs, AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs, Ah9d, Ah9s, Ah9c, Ad9h, Ad9s, Ad9c, As9h, As9d, As9c, Ac9h, Ac9d, Ac9s, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs, KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs, KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs, AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs, QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs, QhTd, QhTs, QhTc, QdTh, QdTs, QdTc, QsTh, QsTd, QsTc, QcTh, QcTd, QcTs, AhJh, AdJd, AsJs, AcJc, KhJh, KdJd, KsJs, KcJc, QhJh, QdJd, QsJs, QcJc, JdJh, JsJh, JcJh, JsJd, JcJd, JcJs, JhTd, JhTs, JhTc, JdTh, JdTs, JdTc, JsTh, JsTd, JsTc, JcTh, JcTd, JcTs, AhTh, AdTd, AsTs, AcTc, KhTh, KdTd, KsTs, KcTc, QhTh, QdTd, QsTs, QcTc, JhTh, JdTd, JsTs, JcTc, TdTh, TsTh, TcTh, TsTd, TcTd, TcTs, Ah9h, Ad9d, As9s, Ac9c, Kh9h, Kd9d, Ks9s, Kc9c, Qh9h, Qd9d, Qs9s, Qc9c, Jh9h, Jd9d, Js9s, Jc9c, Th9h, Td9d, Ts9s, Tc9c, 9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s, Ah8h, Ad8d, As8s, Ac8c, Kh8h, Kd8d, Ks8s, Kc8c, Qh8h, Qd8d, Qs8s, Qc8c, Jh8h, Jd8d, Js8s, Jc8c, Th8h, Td8d, Ts8s, Tc8c, 9h8h, 9d8d, 9s8s, 9c8c, 8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s, Ah7h, Ad7d, As7s, Ac7c, Kh7h, Kd7d, Ks7s, Kc7c, 7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s, Ah6h, Ad6d, As6s, Ac6c, Kh6h, Kd6d, Ks6s, Kc6c, 6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s, Ah5h, Ad5d, As5s, Ac5c, Kh5h, Kd5d, Ks5s, Kc5c, 5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s, Ah4h, Ad4d, As4s, Ac4c, Kh4h, Kd4d, Ks4s, Kc4c, 4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s, Ah3h, Ad3d, As3s, Ac3c, Kh3h, Kd3d, Ks3s, Kc3c, Ah2h, Ad2d, As2s, Ac2c",
      call: "",
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
