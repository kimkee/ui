


# ui.js
HTML,CSS,JS UI
## https://kimkee.github.io/ui/

### ui.alert();
  * 커스텀 알럿창 Alert UI
  ```
  ui.alert({  // 알럿창 띄우기
     msg:'<p>알럿 메시지<br> 입니다.</p>' ,
     ycb:function(){
         console.log('알럿확인결과');
     },
     ybt:'확인'   
 }); 
  ```
### ui.confirm();
  * 커스텀 컨펌창 Confirm UI
  ```
  ui.confirm({ // 컨펌 창 띄우기
      msg:'<p>공통 컨펌창 샘플  <br><u>kimkee@naver.com</u> 님은</p>' +
          '<p>이미 <b>네이버</b> 인증을 통해 회원<br> 가입되었습니다.</p>'+
          '<p>(회원가입 : 2017-08-08)</p>',
      ycb:function(){
          console.log('컨펌확인결과');
      },
      ncb:function(){
          console.log('컨펌취소결과');
      },
      ybt:'로그인하기',
      nbt:'닫기'   
  });
  ```
### ui.toast();
  * 토스트창 하단에서 올라오는 알림메시지 UI
  ```
  ui.toast({  // 토스트 창띄우기
      msg:'<p>토스트메시지입니다.</p>', // 메시지(HTML)
      cls:'wish', // null, 'wish' , 'cart'
      sec:1500 // 사라질 시간
  });
  ```
### ui.popLayer
  * 레이어팝업 뛰우기 (전체,가운데,하단에 띄우기)  히스토리백 historyback 레이어팝업 닫기 지원
  ```
  ui.popLayer.open('popSample1'); // 팝레이어열기
  ui.popLayer.close('popSample1'); // 팝레이어닫기
  ui.popLayer.refresh('popSample1'); // 팝스크롤새로고침
  ui.popLayer.open('popSample1',{  // 레이어팝업 콜백
      ocb:function(){
          console.log("popSample1 열림");
      },
      ccb:function(){
          console.log("popSample1 닫힘");
      }						
  });
  ```
### ui.isUA(t);
  ```
  ui.isUA("Chrome");  // true
  ui.isUA("Windows"); // false
  ui.isUA("Chrome Windows"); // false
  ```
### ui.form.attach();
  * 첨부파일 UI
  ```
  <span class="ui-add-file on" data-ui="attach">
      <span class="btn-attach btn">
          <label class="fileButton">파일선택<input type="file" class="fileInput" accept="*/*"></label>
      </span>
      <span class="file">
          <span class="loc">파일이름.psd</span>
          <button type="button" class="delete">삭제</button>
      </span>
  </span>
  ```
### ui.form.chkall();
  * 첵크박스 모두 첵크
  ```
<label class="checkbox"><input type="checkbox" data-check="all" data-check-id="checkTest1"><span>전체선택</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택1</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택2</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택3</span></label>
  ```
### ui.form.spinner();
  * 수량입력
  ```
<div class="uiSpinner" data-max="5">
				<input class="n" type="number" value="1">
    <button type="button" class="m">-</button>
    <button type="button" class="p">+</button>
</div>
  ```
### ui.loading;
  * 로딩중...  ui.loading.show(); ui.loading.hide();
  ```
  ui.loading.show(); // 로딩열기
  ui.loading.hide(); // 로딩닫기
  ```
### ui.datePick
  * 달력 날짜 선택 - 일선택,주선택,월선택
  ```
<span class="input db uiDate"><input type="text"  placeholder="YYYY-MM-DD" class="datepicker" readonly></span>
<div class="weeks"><span id="START_DT"></span> ~ <span id="END_DT"></span></div>
<span class="uiDate input db week"><input type="text" id="schedWeek" value="2019-04-09" placeholder="YYYY-MM-DD" class="datepicker" readonly></span>
<span class="input db uiDate"><input type="text" class="datepicker_month" placeholder="YYYY-MM-DD" value="2019-06" readonly></span>
  ```
### ui.tog
  * 토글 UI
  ```
  <a href="javascript:;" data-ui-tog="btn" data-ui-tog-val="tog_sample1" class="btn">토글UI</a>
  <div data-ui-tog="ctn" data-ui-tog-val="tog_sample1">
      <p>토글내용 토글내용</p>
      <p>토글내용 토글내용</p>
  </div>
  ```
### ui.tab
  * 탭 UI
  ```
  <ul class="uiTab a">
      <li class="active"><a data-ui-tab-btn="tab_c" data-ui-tab-val="tab_c_1" href="javascript:;">탭메뉴1</a></li>
      <li><a data-ui-tab-btn="tab_c" data-ui-tab-val="tab_c_2" href="javascript:;">탭메뉴2</a></li>
  </ul>
  <div data-ui-tab-ctn="tab_c" data-ui-tab-val="tab_c_1" class="active">
      탭내용1
  </div>
  <div data-ui-tab-ctn="tab_c" data-ui-tab-val="tab_c_2">
      탭내용2
  </div>
  ```
### ui.lock
  * 화면 스크롤 잠금,풀기 (레이어팝업 띄울때 사용)
  ``` 
  ui.lock.using(true);  // 잠금
  ui.lock.using(false); // 풀기
  ```
  
### ui.cookie;
  * 쿠기설정, 
  ``` 
  ui.cookie.set();
  ui.cookie.get();
  ```

### 버튼
```
<a href="javascript:;" class="btn xs">버튼</a>
<a href="javascript:;" class="btn sm">버튼</a>
<a href="javascript:;" class="btn md">버튼</a>
<a href="javascript:;" class="btn lg">버튼</a>
<a href="javascript:;" class="btn xl">버튼</a>
<a href="javascript:;" class="btn" disabled>버튼</a>
<button class="btn" disabled="">버튼</button>
```
![image](https://user-images.githubusercontent.com/6386956/81248582-a3a0cb80-9057-11ea-95a8-b7c92fdfcc75.png)
### 폼요소
```
<label class="checkbox"><input type="checkbox"><span>선택</span></label>
<label class="radio"><input type="radio" name="radio1"><span>선택</span></label>
<div class="uiChk"><input type="checkbox" checked="checked"><em></em></div>
```
![image](https://user-images.githubusercontent.com/6386956/81248230-da2a1680-9056-11ea-93cd-531aa590910d.png)
### 입력
```
<span class="input"><input type="text" placeholder="텍스트"></span>
<span class="input del"><input type="text" placeholder="삭제버튼" value="텍스트"></span>
<span class="input sch"><input type="text" placeholder="검색어 입력"><a href="javascript:;" class="btnSch">검색</a></span>
<span class="textarea"><textarea placeholder="내용"></textarea></span>
```
### Select
  * Select 메뉴
  ```
  <span class="select db">
      <select>
          <option>선택1</option>
          <option>선택2</option>
      </select>
  </span>
  ```
### 별점
```
<div class="uiStar" data-star="3.5">
    <ul>
        <li class="f"><em class="st">별</em></li>
        <li class="f"><em class="st">별</em></li>
        <li class="f"><em class="st">별</em></li>
        <li class="h"><em class="st">별</em></li>
        <li class=""><em class="st">별</em></li>
    </ul>
    <i class="p">3.5</i>
</div>
<div class="uiStar">
    <ul>
        <li class=""><button type="button" class="st">별</button></li>
        <li class=""><button type="button" class="st">별</button></li>
        <li class=""><button type="button" class="st">별</button></li>
        <li class=""><button type="button" class="st">별</button></li>
        <li class=""><button type="button" class="st">별</button></li>
    </ul>
    <i class="p">0</i>
</div>
```
![image](https://user-images.githubusercontent.com/6386956/81248311-02b21080-9057-11ea-8174-fa4922a978d0.png)
### 탭UI
  ```
  <ul class="uiTab a">
      <li class="active"><a data-ui-tab-btn="tab_c" data-ui-tab-val="tab_c_1" href="javascript:;">탭메뉴1</a></li>
      <li class="      "><a data-ui-tab-btn="tab_c" data-ui-tab-val="tab_c_2" href="javascript:;">탭메뉴2</a></li>
  </ul>
  <div data-ui-tab-ctn="tab_c" data-ui-tab-val="tab_c_1" class="active">
      <p><a href="javascript:;">탭내용1</a></p>
  </div>
  <div data-ui-tab-ctn="tab_c" data-ui-tab-val="tab_c_2" class="      ">
      <p><a href="javascript:;">탭내용2</a></p>
  </div>
  ```
![image](https://user-images.githubusercontent.com/6386956/81248519-748a5a00-9057-11ea-9c37-a7ba4f965ca6.png)
### 아코디언
  ```
  <ul class="uiAccd" data-accd="accd">
      <li class="open">
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox" style="">내용</div>
      </li>
      <li>
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox" style="display: none;">내용</div>
      </li>
      <li class="except">
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox" style="">내용</div>
      </li>
  </ul>
  ```
  ![image](https://user-images.githubusercontent.com/6386956/81160926-b4a0fc80-8fc5-11ea-8a31-f68701e4e9e8.png)

### 툴팁레이어
```
<a href="javascript:;" class="icoWarning" data-ui-tooltip="btn" data-ui-tooltip-cont="tooltip-email">!</a>
<!-- 툴팁 레이어 -->
<article class="ui-tooltips" data-tooltip-cont="tooltip-email">
    <div class="pbd">
        <div class="phd">
            <div class="in">
                <h1 class="tit">안내</h1>
                <button type="button" class="btnPopClose">닫기</button>
            </div>
        </div>
        <div class="pct">
            <main class="poptents">
                <ul class="bul-list">
                    <li>가능한 이메일을 사용바랍니다.</li>
                </ul>
            </main>
        </div>
    </div>
</article>
```

### 리스트 More Load
```
<section class="uiTbList">
    <ul class="list" id="dp_list"></ul>
    <div class="uiLoadMore">
        <em></em>
        <button type="button" class="btnLoad" onclick="addItem.using()" id="btnListMore">불러오기</button>
    </div>
</section>
<script>
    var addItem = {
        init: function () {
            this.using();
            this.evt();
        },
        stat: true,
        page: 0,
        evt: function () {
            var _this = this;
            $(window).on("scroll resize", function () { // 바닥 확인
                var wHt = window.visualViewport.height;
                var docH = $(document).height();
                var scr = $(window).scrollTop() + wHt + 30;
                // console.log(docH,scr);
                if (docH <= scr && _this.stat == true) {
                    console.log("바닥sss");
                    _this.using();
                    _this.stat = false;
                }
            });
        },
        using: function () {
            var _this = this;
            _this.stat = false;
            $(".uiLoadMore").addClass("active");

            $.ajax({
                type: "get",
                url: "../inc/list_more.html",
                dataType: "html",
                success: function (html) {
                    window.setTimeout(function () {
                        _this.page++;
                        $("#dp_list").append(html).addClass("load");
                        console.log("페이징 = " + _this.page);
                        _this.stat = true;
                        if (_this.page >= 3) {
                            console.log("끝");
                            $(".uiLoadMore").addClass("hide");
                            _this.stat = false;
                        }
                        $(".uiLoadMore").removeClass("active").removeClass("error");
                        $("#btnListMore").prop("disabled", true);
                        _this.evt();

                    }, 500);
                },
                error: function (error) {
                    // _this.page --;
                    console.log("페이징 = " + _this.page + "에러 = " + error.readyState);
                    $(".uiLoadMore").removeClass("active").addClass("error");
                    $(window).off("scroll");
                    $("#btnListMore").prop("disabled", false);
                }
            });
        }
    };

    addItem.init();

</script>
   ```
