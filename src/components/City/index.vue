<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />

      <scroller v-else ref="city_List" :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">

        <div>
          <div>{{pullDownMsg}}</div>
          <!--样式设计的时候就有问题 -->
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="(hotCity,index) in hotList" :key="index" @tap="handleToCity(hotCity.nm,hotCity.id)">{{hotCity.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(city,index) in cityList" :key="index">
              <h2>{{city.index}}</h2>
              <ul>
                <li v-for="c in city.list" :key="c.id" @tap="handleToCity(c.nm,c.id)">{{c.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroller>

    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      time: 0,
      pullDownMsg: "",
      isLoading: true
    };
  },
  mounted() {
    let cityList = window.localStorage.getItem("cityList"),
      hotList = window.localStorage.getItem("hotList");

    if (cityList && hotList) {
      this.hotList = JSON.parse(hotList);
      this.cityList = JSON.parse(cityList);
      this.isLoading = false;
    } else {
      this.axios.get("/api/cityList").then(res => {
        let msg = res.data.msg;
        if (msg == "ok") {
          let cities = res.data.data.cities,
            { cityList, hotList } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotList = hotList;
          this.isLoading = false;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hotList", JSON.stringify(hotList));
          console.log(123);
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      let cityList = []; // [{ index: firstLetter, list:[{ nm:cities[i].nm, id:cities[i].id }]}]
      let hotList = [];
      for (let i = 0; i < cities.length; i++) {
        let firstLetter = cities[i].py.substring(0, 1).toUpperCase(),
          flag = _checkLetter(firstLetter);
        if (flag === -1) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          cityList[flag].list.push({ nm: cities[i].nm, id: cities[i].id });
        }

        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else if (a.index < b.index) {
          return -1;
        } else {
          return 0;
        }
      });
      function _checkLetter(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return i;
          }
        }
        return -1;
      }

      return { cityList, hotList };
    },

    handleToIndex(index) {
      let h2 = this.$refs.city_sort.getElementsByTagName("h2");
      //原生方法
      //  document.documentElement.scrollTop = h2[index].offsetTop - 95;

      //尝试一下利用better-scroll插件进行,不准确，还是用原生方式,有可能我的代码出现问题了
      // console.log(h2[index].offsetTop-95)
      if (this.time === 0) {
        this.$refs.city_List.toScrollTop(-(h2[index].offsetTop - 95));
      } else {
        this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
      }

      this.time++;
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "更新成功";
        this.axios.get("/api/cityList").then(res => {
          if (res.data.msg === "ok") {
            let cities = res.data.data.cities,
              { cityList, hotList } = this.formatCityList(cities);
            this.cityList = cityList;
            this.hotList = hotList;
          }
        });
      }
    },
    handleToCity(nm, id) {
      this.$store.commit("CITY_INFO", { nm, id }); //此处不用谢city/
      window.localStorage.setItem('nowNM',nm)
      window.localStorage.setItem('nowID',id)
      this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 95px;
  display: flex;
  width: 100%;
}
.city_body .city_list {
  width: 100%;
  height: 820px;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  position: fixed;
  right: 0;
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>