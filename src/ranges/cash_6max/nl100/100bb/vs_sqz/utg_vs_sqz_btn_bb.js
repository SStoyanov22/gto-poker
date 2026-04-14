// UTG vs sqz BTN+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs sqz BTN+BB",
  description: "UTG faces squeeze — BTN called, BB squeezed — 6-max, 100bb",
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
        '30bb': "[0.59585]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/0.59585], [1.396]KhTh, KdTd, KsTs, KcTc[/1.396], [1.81614]KhJh, KdJd, KsJs, KcJc[/1.81614], [5.51571019]Kh6h, Kd6d, Ks6s, Kc6c[/5.51571019], [6.10180119]Kh8h, Kd8d, Ks8s, Kc8c[/6.10180119], [8.46489]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/8.46489], [12.992999999999999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/12.992999999999999], [21.37567761]Kh7h, Kd7d, Ks7s, Kc7c[/21.37567761], [21.46814293]Kh5h, Kd5d, Ks5s, Kc5c[/21.46814293], [21.8935]Kh9h, Kd9d, Ks9s, Kc9c[/21.8935], [22.3165]AhKh, AdKd, AsKs, AcKc[/22.3165], [25.263400000000004]Ah7h, Ad7d, As7s, Ac7c[/25.263400000000004], [28.109]KhQh, KdQd, KsQs, KcQc[/28.109], [44.5419]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/44.5419], [62.6186]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/62.6186]",
        '100bb': "[2.5500700000000003]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/2.5500700000000003], [4.87572]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.87572], [30.208000000000002]AhKh, AdKd, AsKs, AcKc[/30.208000000000002], [74.9028]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/74.9028], [85.099]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/85.099]"},
      call: {
        '15bb': "[1.9080300000000001]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/1.9080300000000001], [16.6287]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/16.6287], [23.4977]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/23.4977], [34.8313]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/34.8313], [47.470600000000005]AhKh, AdKd, AsKs, AcKc[/47.470600000000005], [50.582300000000004]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/50.582300000000004], [96.0289]AhQh, AdQd, AsQs, AcQc[/96.0289]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
