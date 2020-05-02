<template>
  <div class="about-container">
    <div class="ar-section">
      <div class="ar-title">关于我们</div>
      <div class="ar-content">
        <div>
          川海底捞餐饮股份有限公司董事长张勇先生，八十年代初，在简阳城关镇第二中学就读的他，已经为自己树立了人生目标。中学毕业后，进入简阳市空分技校学习，在此期间，博览群书，为以后在商业中具有敏锐的视觉和独特的思维打下了坚实基础。
        </div>
        <div>
          八八年七月，技校毕业后进入四川拖拉机厂。在拖拉机厂工作的六年里，张勇先生并不是一个安于现状的人，常常利用休假和节假日时间，遍访祖国的大江南北，考察市场，寻找商机。
        </div>
        <div>
          经过深入仔细的市场调查分析，九四年，第一家“海底捞火锅”便正式开业。开业之初，目标已不在四川本土，而是把眼光投向了全国。之后他不断向国内大型餐饮企业求精学艺，经过七年的拼搏奋斗，于二零零一年四月,四川省简阳市海底捞餐饮有限责任公司正式成立。
        </div>
        <div>
          现海底捞已在全国范围内开了七十一家直营分店，每年还以五至七家递增。在这十八年的企业运作实践中积累了丰富的市场经验和管理经验的他，还先后走访欧美，考察市场，
          向国际大型餐饮企业学习，成为中国餐饮协会成员，四川省餐饮协会常务理事会员。
        </div>
      </div>
    </div>
    <div class="ar-section">
      <div class="ar-title">企业文化</div>
      <div class="ar-content">
        <div>
          海底捞始终高扬“绿色，健康，营养，特色”的大旗，致力于火锅技术的开发与研究，在继承川、渝餐饮文化原有的“麻、辣、鲜、香、嫩、脆”等特色的基础上，不断创新，以独特、纯正、鲜美的口味和营养健康的菜品，赢得了顾客的一致推崇并在众多的消费者心目中留下了“好火锅自己会说话”的良好口碑。
        </div>
        <div>
          海底捞始终坚持“绿色，无公害，一次性”的选料和底料原则，严把原料关，配料关，十三年来历经市场和顾客的检验，成功的打造出信誉度高，颇具四川火锅特色，融汇巴蜀餐饮文化“蜀地，蜀风”浓郁的优质火锅品牌。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transition from '@/components/Transition'
export default {
  name: '',

  components: { Transition },
  props: {},
  data() {
    return {}
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.about-container {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  min-height: 1200px;
  padding-top: 100px;
  .ar-section {
    width: 40vw;
    @media screen and(max-width: 1264px) {
      width: 60vw;
    }
    @media screen and(max-width: 960px) {
      width: 90vw;
    }
    .ar-title {
      font-size: 30px;
      font-weight: bolder;
    }
    .ar-content {
      div {
        margin-top: 15px;
      }
      font-size: 18px;
      line-height: 180%;
      font-weight: 400;
      padding-bottom: 50px;
    }
  }
}
</style>
