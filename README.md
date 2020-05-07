


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
### ui.form.select();
  * Select 메뉴
  ```
  <span class="select db">
      <select>
          <option>선택1</option>
          <option>선택2</option>
      </select>
  </span>
  ```
### ui.form.chkall();
  * 첵크박스 모두 첵크
### ui.form.intdel();
  * 입력내용지우는 input
### ui.form.spinner();
  * 수량입력
### ui.form.star();
  * 별점주기
### ui.loading;
  * 로딩중...  ui.loading.show(); ui.loading.hide();
  ```
  ui.loading.show(); // 로딩열기
  ui.loading.hide(); // 로딩닫기
  ```
### ui.accd
  * 아코디언 UI
### ui.datePick
  * 달력 날짜 선택 - 일선택,주선택,월선택
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
      <p><a href="javascript:;">탭내용1</a></p>
  </div>
  <div data-ui-tab-ctn="tab_c" data-ui-tab-val="tab_c_2">
      <p><a href="javascript:;">탭내용2</a></p>
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

## 버튼
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
## 폼요소
```
<label class="checkbox"><input type="checkbox"><span>선택</span></label>
<label class="radio"><input type="radio" name="radio1"><span>선택</span></label>
<div class="uiChk"><input type="checkbox" checked="checked"><em></em></div>
```
![image](https://user-images.githubusercontent.com/6386956/81248230-da2a1680-9056-11ea-93cd-531aa590910d.png)
## 별점
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
## 탭UI
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
## 아코디언
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


  
