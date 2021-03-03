


# ui.js
HTML,CSS,JS UI
## https://kimkee.github.io/ui/
### https://kimkee.github.io/ui/static/js/ui.js

### ui.alert();
  > 커스텀 알럿창 Alert UI
  ```
  ui.alert('공통 알럿창입니다.'); // 옵션없이 메시지만..
  ui.alert('공통 알럿창입니다.',{ // 알럿 옵션들
    tit:"알럿타이틀",
    ycb:function(){
      console.log('알럿확인결과');
    },
    ybt:"확인" // 기본값 "확인"
  });
  ```
### ui.confirm();
  > 커스텀 컨펌창 Confirm UI
  ```
  ui.confirm('공통 컨펌창 입니다.',{ // 컨펌 창 옵션들
    tit:"컨펌타이틀",
    ycb:function(){
      console.log('컨펌확인결과');
    },
    ncb:function(){
      console.log('컨펌취소결과');
    },
    ybt:"확인", // 기본값 "확인"
    nbt:"취소"  // 기본값 "취소"
  });
  ```
### ui.toast();
  > 토스트창 하단에서 올라오는 알림메시지 UI
  ```
  // 토스트 창띄우기
  ui.toast('토스트메시지입니다.');
  ui.toast('토스트메시지입니다.',{
    cls:'abcd', // null , string
    bot:74,  // 바닥에서 띄울 간격
    sec:3000 // 사라질 시간 number
  });
  ```
### ui.popLayer
  > 레이어팝업 뛰우기 (전체,가운데,하단에 띄우기)  히스토리백 historyback 레이어팝업 닫기 지원
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
<article class="popLayer a popSample1" id="popSample1">
    <div class="pbd">
        <div class="phd">
            <div class="in">
                <h1 class="tit">타이틀</h1>
                <button type="button" class="btnPopClose">닫기</button>
            </div>
        </div>
        <div class="pct">
            <main class="poptents">
                내용
            </main>
        </div>
        <div class="pbt">
            <div class="bts">
                <a href="javascript:;" class="btn e">버튼</a>
                <a href="javascript:;" class="btn a">버튼</a>
            </div>
        </div>
    </div>
</article>
```
### ui.isUA(t);
  ```
  ui.isUA("Chrome");  // true
  ui.isUA("Windows"); // false
  ui.isUA("Chrome Windows"); // false
  ```
### ui.form.attach();
  > 첨부파일 UI
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
  > 첵크박스 모두 첵크
  ```
<label class="checkbox"><input type="checkbox" data-check="all" data-check-id="checkTest1"><span>전체선택</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택1</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택2</span></label>
<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택3</span></label>
  ```
  ![image](https://user-images.githubusercontent.com/6386956/81261190-90e9bf00-9076-11ea-8705-1724c0f7d368.png)

### ui.form.spinner();
  > 수량입력 최고수량 data-max="5"
  ```
  <div class="uispiner" data-min="1" data-max="5">
    <input type="text" value="1" class="amt" title="수량선택">
    <button type="button" class="bt minus">수량더하기</button>
    <button type="button" class="bt plus">수량빼기</button>
  </div>
  ```
### ui.form.spined();
> 수량선택
```
<span class="uispined" data-max="5"><input class="amt" value="3" type="number"></span>
<span class="uispined" data-max="12"><input class="amt" value="5" type="number"></span>
<span class="uispined" data-max="20"><input class="amt" value="15" type="number"></span>
```
![image](https://user-images.githubusercontent.com/6386956/109746477-cc163980-7c18-11eb-83d1-514bb6e7ec6f.png)
### ui.loading;
  > 로딩중...  ui.loading.show(); ui.loading.hide();
  ```
  ui.loading.show(); // 로딩열기
  ui.loading.hide(); // 로딩닫기
  ```
### ui.datePick
  > 달력 날짜 선택 - 일선택,주선택,월선택
  ```
<span class="input db uiDate"><input type="text"  placeholder="YYYY-MM-DD" class="datepicker" readonly></span>
<div class="weeks"><span id="START_DT"></span> ~ <span id="END_DT"></span></div>
<span class="uiDate input db week"><input type="text" id="schedWeek" value="2019-04-09" placeholder="YYYY-MM-DD" class="datepicker" readonly></span>
<span class="input db uiDate"><input type="text" class="datepicker_month" placeholder="YYYY-MM-DD" value="2019-06" readonly></span>
  ```
![image](https://user-images.githubusercontent.com/6386956/81260888-ee314080-9075-11ea-85a2-1f8c50e17c6e.png)
![image](https://user-images.githubusercontent.com/6386956/81261321-d4442d80-9076-11ea-86b7-b194139a6164.png)
![image](https://user-images.githubusercontent.com/6386956/81261023-381a2680-9076-11ea-9686-720367832b9f.png)
![image](https://user-images.githubusercontent.com/6386956/81261279-c098c700-9076-11ea-8061-dda43bdb0a2c.png)
### ui.tog
  > 토글 UI
  ```
  <a href="javascript:;" data-ui-tog="btn" data-ui-tog-val="tog_sample1" class="btn">토글UI</a>
  <div data-ui-tog="ctn" data-ui-tog-val="tog_sample1">
      <p>토글내용 토글내용</p>
      <p>토글내용 토글내용</p>
  </div>
  ```
### ui.lock.using();
  > 화면 스크롤 잠금,풀기 (레이어팝업 띄울때 사용)
  ``` 
  ui.lock.using(true);  // 잠금
  ui.lock.using(false); // 풀기
  ```
  
### ui.cookie;
  > 쿠기설정, 
  ``` 
  ui.cookie.set(cname, cvalue, exdays);  // cname(이름), cvalue(값), exdays(시간)
  ui.cookie.get(cname); // cname(이름)
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
![image](https://user-images.githubusercontent.com/6386956/109746618-05e74000-7c19-11eb-9be1-756c527b6496.png)
### 폼요소
```
<label class="checkbox"><input type="checkbox"><span class="txt">선택</span></label>
<label class="radio"><input type="radio" name="radio1"><span class="txt">선택</span></label>
<div class="uiChk"><input type="checkbox" title="텍스트" checked><em></em></div>
```
![image](https://user-images.githubusercontent.com/6386956/109746757-434bcd80-7c19-11eb-8c86-f58cd3f04a40.png)
### 입력
```
<span class="input"><input type="text" placeholder="텍스트"></span>
<span class="input del"><input type="text" placeholder="삭제버튼" value="텍스트"></span>
<span class="input sch"><input type="text" placeholder="검색어 입력"><a href="javascript:;" class="btnSch">검색</a></span>
<span class="textarea"><textarea placeholder="내용"></textarea></span>
```
![image](https://user-images.githubusercontent.com/6386956/109746945-9de52980-7c19-11eb-8f92-b4092070be93.png)
### Select
  ```
  <span class="select"> //기본UI
      <select>
          <option>선택1</option>
          <option>선택2</option>
      </select>
  </span>
  <span class="select jqui"> // jQuery selectmenu();
      <select>
          <option>선택1</option>
          <option>선택2</option>
      </select>
  </span>
  ```
### 별점
```
<div class="uiStar" data-star="3.5">  // 별점 보기
    <ul>
        <li><em class="st">별</em></li>
        <li><em class="st">별</em></li>
        <li><em class="st">별</em></li>
        <li><em class="st">별</em></li>
        <li><em class="st">별</em></li>
    </ul>
    <i class="p">3.5</i>
</div>
<div class="uiStar"> // 별점 주기 버튼
    <ul>
        <li><button type="button" class="st">별</button></li>
        <li><button type="button" class="st">별</button></li>
        <li><button type="button" class="st">별</button></li>
        <li><button type="button" class="st">별</button></li>
        <li><button type="button" class="st">별</button></li>
    </ul>
    <i class="p">0</i>
</div>
```
![image](https://user-images.githubusercontent.com/6386956/81248311-02b21080-9057-11ea-8174-fa4922a978d0.png)
### 탭UI
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
![image](https://user-images.githubusercontent.com/6386956/81248519-748a5a00-9057-11ea-9c37-a7ba4f965ca6.png)
### 아코디언
  ```
  <ul class="uiAccd" data-accd="accd">
      <li class="open">
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox">내용</div>
      </li>
      <li>
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox">내용</div>
      </li>
      <li class="except">
          <div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
          <div class="cBox">내용</div>
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
