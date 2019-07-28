<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"/>
    <scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDowm">{{pullDownMsg}}</li>
        <li v-for="(movie,index) in movieList" :key="index">
          <div class="pic_show" @tap="handleToDetail(movie.id)">
            <img :src="movie.img | setWH('128.280')" />
          </div>
          <div class="info_list" @tap="handleToDetail(movie.id)">
            <h2>{{movie.nm}}</h2>
            <p>
              观众评
              <span class="grade">{{movie.sc}}</span>
            </p>
            <p>主演: {{movie.star}}</p>
            <p>{{movie.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      preCityid: -1,
      isLoading:true
    };
  },
  activated() {
    var cityId = this.$store.state.city.id
    if( this.preCityid === cityId){return ;}
    this.isLoading = true

    this.axios.get("/api/movieOnInfoList?cityId="+cityId).then(res => {
      if (res.data.msg === "ok") {
        this.movieList = res.data.data.movieList;
        this.isLoading = false;
        this.preCityid = cityId
      }
    });
  },
  methods: {
    handleToDetail(movieId) {
      this.$router.push('/movie/detail/1/'+movieId) 
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "更新成功";
        this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
          if (res.data.msg === "ok") {
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.movie_body {
  width: 100%;
  height: 820px;
  overflow: auto;
  margin-top: 95px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDowm {
  margin: 0;
  padding: 0;
}
</style>