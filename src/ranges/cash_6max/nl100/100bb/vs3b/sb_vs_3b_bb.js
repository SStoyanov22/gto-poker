// SB vs 3b BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs 3b BB",
  description: "SB faces 3-bet from BB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raises: {
        '20bb': "",
        '100bb': "",
      },
      call: {
        '10bb': "",
      },
    },
    '2.25bb': {
      raises: {
        '20bb': "",
        '100bb': "",
      },
      call: {
        '10bb': "",
      },
    },
    '2.5bb': {
      raises: {
        '20bb': "[0.8812385500000001]Kh7h, Kd7d, Ks7s, Kc7c[/0.8812385500000001], [1.77288]AhTh, AdTd, AsTs, AcTc[/1.77288], [1.94475774]QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs[/1.94475774], [2.77393254]KhTd, KhTs, KhTc, KdTh, KdTs, KdTc, KsTh, KsTd, KsTc, KcTh, KcTd, KcTs[/2.77393254], [4.49756982]Ah8h, Ad8d, As8s, Ac8c[/4.49756982], [8.817982650000001]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/8.817982650000001], [9.54285172]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/9.54285172], [10.36784777]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/10.36784777], [13.20439959]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/13.20439959], [14.79063924]Kh5h, Kd5d, Ks5s, Kc5c[/14.79063924], [17.39373495]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/17.39373495], [20.86350344]Th8h, Td8d, Ts8s, Tc8c[/20.86350344], [24.41801362]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/24.41801362], [25.85234261]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/25.85234261], [29.239869969999997]Kh9h, Kd9d, Ks9s, Kc9c[/29.239869969999997], [31.28674989]Ah7h, Ad7d, As7s, Ac7c[/31.28674989], [31.36264709]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/31.36264709], [32.52523497]Jh9h, Jd9d, Js9s, Jc9c[/32.52523497], [35.64694866]Th9h, Td9d, Ts9s, Tc9c[/35.64694866], [35.68685258]Qh9h, Qd9d, Qs9s, Qc9c[/35.68685258], [36.7068]KhTh, KdTd, KsTs, KcTc[/36.7068], [36.90030323]Ah5h, Ad5d, As5s, Ac5c[/36.90030323], [40.5714871]QhTh, QdTd, QsTs, QcTc[/40.5714871], [43.90452438]JhTh, JdTd, JsTs, JcTc[/43.90452438], [44.782642030000005]Ah3h, Ad3d, As3s, Ac3c[/44.782642030000005], [45.898292600000005]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/45.898292600000005], [49.23989919]AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs[/49.23989919], [51.635751139999996]Ah6h, Ad6d, As6s, Ac6c[/51.635751139999996], [53.34525385]Ah4h, Ad4d, As4s, Ac4c[/53.34525385], [54.90446116]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/54.90446116], [57.767500000000005]Ah9h, Ad9d, As9s, Ac9c[/57.767500000000005], [68.36844162]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/68.36844162], [84.2191]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/84.2191], [89.88589999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/89.88589999999999], [91.0538]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/91.0538], [92.1373]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/92.1373], [98.83340000000001]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/98.83340000000001], AhKh, AdKd, AsKs, AcKc, AhQh, AdQd, AsQs, AcQc",
        '100bb': "[11.267288039999999]KhQh, KdQd, KsQs, KcQc[/11.267288039999999], [20.26630853]QhJh, QdJd, QsJs, QcJc[/20.26630853], [34.642638840000004]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/34.642638840000004], [39.9266]KhJh, KdJd, KsJs, KcJc[/39.9266], [46.9007074]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/46.9007074], [79.11649697]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/79.11649697]",
      },
      call: {
        '10bb': "[0.78076431]8h7h, 8d7d, 8s7s, 8c7c[/0.78076431], [1.9916182300000003]6h5h, 6d5d, 6s5s, 6c5c[/1.9916182300000003], [5.36846189]5h4h, 5d4d, 5s4s, 5c4c[/5.36846189], [6.20165803]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/6.20165803], [9.9524586]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/9.9524586], [10.03195838]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/10.03195838], [10.05054886]Ah6h, Ad6d, As6s, Ac6c[/10.05054886], [16.250933319999998]9h8h, 9d8d, 9s8s, 9c8c[/16.250933319999998], [16.84515797]Ah3h, Ad3d, As3s, Ac3c[/16.84515797], [17.722092319999998]Th8h, Td8d, Ts8s, Tc8c[/17.722092319999998], [19.060594299999998]7h6h, 7d6d, 7s6s, 7c6c[/19.060594299999998], [21.20864615]Ah4h, Ad4d, As4s, Ac4c[/21.20864615], [21.47924742]Qh9h, Qd9d, Qs9s, Qc9c[/21.47924742], [29.50418003]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/29.50418003], [29.87535134]Th9h, Td9d, Ts9s, Tc9c[/29.87535134], [32.820090359999995]Kh8h, Kd8d, Ks8s, Kc8c[/32.820090359999995], [33.51826503]Jh9h, Jd9d, Js9s, Jc9c[/33.51826503], [36.63249677]Ah5h, Ad5d, As5s, Ac5c[/36.63249677], [38.85505011]Ah7h, Ad7d, As7s, Ac7c[/38.85505011], [42.2325]Ah9h, Ad9d, As9s, Ac9c[/42.2325], [46.60383003]Kh9h, Kd9d, Ks9s, Kc9c[/46.60383003], [50.21425291]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/50.21425291], [50.33835739]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/50.33835739], [54.33596505]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/54.33596505], [54.96779894]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/54.96779894], [56.09507562]JhTh, JdTd, JsTs, JcTc[/56.09507562], [56.9533129]QhTh, QdTd, QsTs, QcTc[/56.9533129], [60.0734]KhJh, KdJd, KsJs, KcJc[/60.0734], [62.78654828]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/62.78654828], [62.92595223000001]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/62.92595223000001], [63.293200000000006]KhTh, KdTd, KsTs, KcTc[/63.293200000000006], [76.56733828]Ah8h, Ad8d, As8s, Ac8c[/76.56733828], [77.91150884]QhJh, QdJd, QsJs, QcJc[/77.91150884], [85.94831196]KhQh, KdQd, KsQs, KcQc[/85.94831196], [96.2963]AhJh, AdJd, AsJs, AcJc[/96.2963], [98.22710000000001]AhTh, AdTd, AsTs, AcTc[/98.22710000000001], ",
      },
    },
    '3bb': {
      raises: {
        '20bb': "",
        '100bb': "",
      },
      call: {
        '10bb': "",
      },
    },
  }
}
