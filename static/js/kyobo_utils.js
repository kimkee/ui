/**
================================================================================
1. 프로그램 ID : utils.js
2. 화면     명 : 공통 js
3. 시 스 템 명 : 공통
4. 서브 시스템 : 
5. 연결프로그램: 
6. 설       명 : Web Application에서 사용될 공용 Javascript 를 제공한다.
7. 작   성  자 : 권대준
8. 작   성  일 : 2012-05-16 
9. 수 정 내 역 : 기존 Pilot Application 에서 사용되었던 것을 현재의 명명규칙에 의거 재정의 함.

버전    |    수정일    |    수정자    |    수정내역
================================================================================

================================================================================
Copyrights 2012 by Kyobo Info. All right reserved.
================================================================================
 */

/****
 *  1.문자 함수들의 모음
 *      fnIsEmpty                 : 입력된 문자열이 비었는가?
 *      fnL_Trim                  : 입력된 문자와 동일한 왼편 문자삭제
 *      fnR_Trim                  : 입력된 문자와 동일한 오른편 문자삭제
 *      fnTrim                    : 입력된 문자의 양쪽 공백을 삭제
 *      fnFConvertSpaces          : 입력된 문자사이의 공백 제거
 *      fnReplace                 : 문자열제거
 * 		fnRemoveRight			  : 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라낸다
 * 		fnSubStrLeft 			  : 입력된 str을 입력받은 길이만큼 왼쪽에서부터 잘라서 return
 * 		fnSubStrRight  			  : 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라서 return
 *      fn_getTokenArray          : 문자열 Tokening
 *  	fnCompare				  : 단순 문자열 비교
 *  	CompareSize	 			  : 파라미터로 받은 사이즈 비교
 * 		fnCasecmp	  			  : 대소문자 비교안하는 비교
 * 		fnNcaseCmp	  			  : 대소문자 비교안하면서 사이즈 비교
 * 		fnStrCount	  			  : 문자열 검색 카운트
 * 		fnStrFind	  			  : 파라미터로 받은 문자열 위치찾기
 * 		fnStrFindCase	  		  : 대소문자 구분없이 문자열 위치찾기
 * 		fnStrReverseFind		  : 문자열 끝에서부터 위치찾기
 * 		fnStrReverseFindCase	  : 대소문자 구분없이 문자열 끝에서부터 위치찾기
 * 		fnStrSpliceSize			  : 문자열 생략 후 “…” 붙이기
 * 		fnGetBefo				  : 주민번호로 연대반환
 *		fnGetBirthdayOfJuminNo	  : 주민번호로 생년월일 반환
 * 		fnGetAgeOfJuminNo		  : 주민번호로 만/일반나이 반환
 * 		fnMakeHexaChar		      : 난수 생성
 * 
 * 		fnTelMask				  : MASK 처리 - 전화번호 가운데 자리
 * 		fnTelMaskLast			  : MASK 처리 - 전화번호 마지막 자리
 * 		fnRegMask				  : MASK 처리 - 주민번호
 * 		fnRegMaskDash			  : MASK 처리 - 주민번호
 * 		fnNameMask				  : MASK 처리 - 이름
 * 		fnAddrMask				  : MASK 처리 - 주소
 * 		fnEmailMask				  : MASK 처리 - 이메일
 * 		fnContNoMask			  : MASK 처리 - 증권번호
 * 		fnLastNoMaskFour		  : MASK 처리 - 마지막 4자리 Mask - 계좌번호, 사업자번호 등
 * 		fnMoneyMaskAll			  : MASK 처리 - 금액 모든 자리 Mask
 * 		fnLoanNoMask			  : MASK 처리 - 대출번호 마스킹 앞(3) 뒤(5) ----- (12.11.15) 추가
 * 		fnLoanAccountNoMask		  : MASK 처리 - 계좌번호 마스킹 앞(5) 뒤(3) ----- (12.11.16) 추가
 * 		fnInsuNoMask			  : MASK 처리 - 계좌/보험번호 가운데 자리 Mask (masking할 자릿수를 문자열 길이에 따라 상대적으로 정함)
 * 
 * 		fnMaskViewChanger_CallBack_hidden	  : 
 * 		fnMaskViewChanger_hidden			  : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복 - Hidden 사용 시
 * 		fnMaskViewChanger_CallBack			  : 
 * 		fnMaskViewChanger			  		  : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복
 * 
 *  2. 숫자 함수들의 모음
 *      fnKeyCheck                : 숫자, 백스페이스, tab, 엔터, delete 키만을 기입받게 하는 방법 (onKeypress='return keyCheckDot(event)')
 *      fnKeyCheckMinus           : 숫자, 백스페이스, tab, 엔터, delete, - 키만을 기입받게 하는 방법 (onKeypress='return keyCheckDot(event)')
 *      fnKeyCheckDot             : 숫자및돗트입력(onKeypress='return keyCheckDot(event)')
 *      fnKeyCheckMinusDot        : 숫자및돗트입력(onKeypress='return keyCheckMinusDot(event)')
 *      fnCheckNumber             : 금액체크 (3단위마다 컴마를 붙인다.)
 *      fnChkhando                : 한정액(일정금액 이상이 되면 올라기지 않게 한다.)
 *      fnCheckNumberDot          : 이자율(소수점 사용가능)
 *      fnFilterNum               : 참조함수(컴마제거)
 *      fnCommaSplitAndNumberOnly : 참조함수(컴마불가)
 *      commaSplitAndAllowDot     : 참조함수(컴마가능)
 *      fnNoSplitAndNumberOnly    : 숫자만가능
 *      fnByte                    : 바이트검사
 *      fnFRound                  : 소수점이하 숫자의 반올림
 *      fnFRoundInteger			  : 소수점이하의 숫자를 버리고 정수만 리턴  
 *     	fnFloor					  : 소수점 이하 임의의 자리에서 내림
 *      fnIsDigit                 : 입력된 문자가 숫자인가?
 *      fnIsInteger               : 입력된 문자열이 숫자만으로 구성되었는가?
 *      fnIsFloat                 : 입력된 문자열이 .와 숫자만으로 구성되었는가?
 * 		fnSetFocusoutNumber		  : InputBox 에 KeyIn 시 숫자유효성을 체크하고 숫자 포맷(Comma를 보여줌) 으로 표현
 * 		fnGetParseNumber		  : 입력된 문자열을 숫자로 변환
 *  3.날자 함수들의 모음
 *      fnIsLeapYear              : 윤년인지를 점검
 *      fnGetDaysInMonth          : 입력 월,년에 해당하는 일수를 계산
 *      fnIsDate                  : 입력된 문자열이 YYYYMMDD의 날짜형식인가?
 *      fnIsTime                  : 입력된 문자열이 HHMM의 시간형식인가?
 *      fnSetFormatDate           : input tag object를 받아서 value의 문자열(YYYYMMDD 형식)을 YYYY.MM.DD 형식으로 변환
 *      fnSetFormatDateStr        : 문자열(YYYYMMDD 형식)을 YYYY.MM.DD 형식으로 변환
 *      fnSetFormatDateYYYYMM      : 문자열(YYYYMM 형식)을 YYYY.MM 형식으로 변환
 *      fnSetFormatTime           : HHMM 형식으로 입력한 문자열을 HH:MM 형식으로 변환
 *      fnMakeDateFormat 		  : yyyymm 또는 yyyymmdd 형식의 문자열에 "." 또는 "-"가 있으면 제거, 없으면 "."를 추가
 * 		fnGetToday 				  : yyyyMMdd 형식의 오늘날짜, yyyyMM 형식의 오늘날짜 반환
 *      fnCurrentDtm              : 현재일시(yyyyMMddhhMiss) 형식으로 반환
 *      fnSetFormatDtm            : 문자열(YYYYMMDDHHMISS 형식)을 YYYY-MM-DD HH:MI:SS 형식으로 변환
 * 		fnDayCalculator 		  : 기준날짜에서 날짜를 가감하여 반환
 * 
 * 								  : 해당월의 마지막 일자 반환
 * 								  : 음력일자 반환
 *      fnCaldays                 : 두 날짜사이의 일수를 구함
 *
 *  4.기타 함수들의 모음
 *      fnSetFormatJumin          : 주민번호 xxxxxx-xxxxxxx 형식으로 변환
 * 		fnTelNoDash				  : 전화번호에 "-"넣는다  예)01011112222 --> 010-1111-2222으로 변환
 *      fnJuminNoFormat           : 주민번호에 "-"넣는다  예)1234561234567 --> 123456-1234567으로 변환
 *      fnFChkJumin               : 앞자리와 뒷자리 각각 입력시 체크
 *      fnFComChkReg              : 주민번호 유효성 체크, 앞자리 뒷자리 구분시
 *      fnFComChkReg2             : 주민번호 유효성 체크, 13자리로 입력시
 *      fnJuminFormatChk          : 주민등록번호 형식 확인
 *      fnChkWorkNumb             : 사업자등록번호 체크
 *      fnFindInPage              : 내용찾기
 *      fnClear_select            : 셀렉트 옵션 제거
 *      fnCopy_select             : 셀렉트 카피
 *      fnGetOriginStr            : SetMoneyForm 에서 사용. 소수점허용자리수 체크
 *      fnMakeMoney               : SetMoneyForm 에서 사용. 콤마 찍기.
 *      fnMakeMoneyNotDot         : SetMoneyForm 에서 사용. 소숫점 제거.
 *      fnSetMoneyForm            : 금액 포맷적용.
 *      fnSetPicture              : 이미지 미리보기
 *      fnNum2won                 : 한글 금액(천단위)
 *      fnNum2won_2               : 한글 금액(원단위)
 *      fnRegNoFormat             : 숫자형 자료에 포멧 적용(#,-) 만 사용. 주민등록번호, 사업자등록번호 등에 사용
 *      fnFormatString            : 숫자형 자료에 포멧 적용(#,-) 만 사용. 주민등록번호, 사업자등록번호 등에 사용. String형으로 Return
 *      fnChgFocus                : 입력하는 문자 길이에 따라 Focus 이동하기(길이, this, 다음텍스트박스의이름)
 *      fnFCheckNumber            : 재산등록시 숫자 및 - 입력 가능
 *      fnFCommaInsert            : 재산등록시 comma 추가
 *      fnF_chkMaxLen             : 글자수 체크 함수
 *      fnCheckMsg                : f_chkMaxLen 에서 사용. 일정 바이트까지 입력후 초과부분 삭제.
 *      fnCutText                 : f_chkMaxLen 에서 사용. 글자 자르기.
 *      fnByte_check              : f_chkMaxLen 에서 사용. 바이트 체크
 *      fnReplaceSpecial          : f_chkMaxLen 에서 사용. ?
 *		fnJSONToQueryString   	  : 입력된 JSON을 Query String형태로 변환한다. 
 *		fnArrayToQueryString  	  : 입력된 배열을 Query String형태로 변환한다. 
 *		fnResultEmpty			  : 입력된 문자열을 체크해서 값이 없을때 '-'로 처리
 */


var UTIL = {};

/*******************************************************************************
 * *********************************************************************************************+++
 * 1.문자 함수들의 모음
 ******************************************************************************/
// ///////////////////////////////////////////////////
// isEmpty : 입력된 문자열이 비었는가?
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// ///////////////////////////////////////////////////
// < Output >
// isEmpty : true,false
// ///////////////////////////////////////////////////
UTIL.fnIsEmpty = function(str) {
	return ((str == null) || (str.length == 0));
};

// ///////////////////////////////////////////////////
// L_Trim : 입력된 문자와 동일한 왼편 문자삭제
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// c -- 제거할 문자
// ///////////////////////////////////////////////////
// < Output >
// L_Trim : 왼쪽 s(문자)가 제거된 문자열
// ///////////////////////////////////////////////////
UTIL.fnL_Trim = function(str, c) {
	if (UTIL.fnIsEmpty(str))
		return "";

	while (1) {
		if (str.length == 0)
			break;
		else if (str.charAt(0) != c)
			break;

		str = str.substring(1, str.length);
	}

	return str;
};

// //////////////////////////////////////////////////
// R_Trim : 입력된 문자와 동일한 오른편 문자삭제
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// c -- 제거할 문자
// ///////////////////////////////////////////////////
// < Output >
// R_Trim : 왼쪽 s(문자)가 제거된 문자열
// ////////////////////////////////////////////////////
UTIL.fnR_Trim = function(str, c) {
	if (UTIL.fnIsEmpty(str))
		return "";

	while (1) {
		if (str.length == 0)
			break;
		else if (str.charAt(str.length - 1) != c)
			break;

		str = str.substring(0, str.length - 2);
	}

	return str;
};

// ///////////////////////////////////////////////////
// Trim : 입력된 문자의 양쪽 공백을 삭제
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// ///////////////////////////////////////////////////
// < Output >
// Trim : 양쪽 빈 공백을 삭제한 문자
// ///////////////////////////////////////////////////
String.prototype.trim = function() {
	return this.replace(/^\s*(\b.*\b|)\s*$/, "$1"); // 문장의 앞과 뒤의 공백 제거
};

// ///////////////////////////////////////////////////
// fConvertSpaces : 입력된 문자사이의 공백 제거
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// ///////////////////////////////////////////////////
// < Output >
// 공백제거 후 문자
// ///////////////////////////////////////////////////
UTIL.fnFConvertSpaces = function(str) {
	var out = "", flag = 0;

	for ( var i = 0; i < str.length; i++) {
		if (str.charAt(i) != " ") {
			out += str.charAt(i);
			flag = 0;
		} else {
			if (flag == 0) {
				out += "";
				flag = 1;
			}
		}
	}

	return out;
};

// ///////////////////////////////////////////////////
// Replace : 문자열제거
// ///////////////////////////////////////////////////
UTIL.fnReplace = function(strString, strChar) {
	var strTmp = "";

	for ( var i = 0; i < strString.length; i++) {
		if (strString.charAt(i) != strChar)
			strTmp = strTmp + strString.charAt(i);
	}

	return strTmp;
};

// ///////////////////////////////////////////////////
// replace : 문자열을 받아 치환 후 반환
// ///////////////////////////////////////////////////
UTIL.replace = function(target, bStr, aStr) {
	if (target == undefined || target == "")
		return "";
	target = target.replace(new RegExp(bStr.replace('\\', '\\\\'), "g"), aStr);
	return target;
};

/**
 * 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라낸다 return 한다.
 * 
 * @param str
 *            문자열
 * @param len
 *            길이
 * @return 문자열
 */
UTIL.fnRemoveRight = function(str, len) {

	str = str.substr(0, str.length - len);

	return str;
};

/**
 * 입력된 str을 입력받은 길이만큼 왼쪽에서부터 잘라서 return 한다.
 * 
 * @param str
 *            문자열
 * @param len
 *            길이
 * @return 문자열
 */
UTIL.fnSubStrLeft = function(str, len) {

	str = str.substr(0, len);

	return str;
};

/**
 * 입력된 str을 입력받은 길이만큼 오른쪽에서부터 잘라서 return 한다.
 * 
 * @param str
 *            문자열
 * @param len
 *            길이
 * @return 문자열
 */
UTIL.fnSubStrRight = function(str, len) {

	str = str.substr(str.length - len, str.length);

	return str;
};

/**
 * 입력된 str을 strDelim으로 구분하여 배열로 반환한다. fnGetTokenArray ex) arrReturn =
 * getTokenArray("123|abc|adfg","|"); arrReturn[0] = "123" arrReturn[1] = "abc"
 * arrReturn[2] = "adfg"
 * 
 * @param str
 *            문자열
 * @param strDelim
 *            구분문자
 * @return 문자열 배열
 */
UTIL.fn_getTokenArray = function(str, strDelim) {
	var index = 0;
	var strLen = str.length;
	var delimLen = strDelim.length;
	var arrToken = new Array;

	if (str == null || str == "")
		return str;

	for ( var i = 0;; i++) {
		if ((index = str.indexOf(strDelim)) != -1) {
			arrToken[i] = str.substring(0, index);
			str = str.substring(index + delimLen);
		} else {
			arrToken[i] = str;
			break;
		}
	}
	return arrToken;
};

/*******************************************************************************
 * 설명 : String 비교함수 arg : str : 비교 String str1 : 비교 String return : 같으면 true,
 * 다르면 false
 ******************************************************************************/
UTIL.fnCompare = function(str, str1) {
	if ("x" + str == "x" + str1)
		return 0;
	return -1;
};

/*******************************************************************************
 * 설명 : size만큼 String 을 비교하는 함수 arg : str : 비교 String str1 : 비교 String n : size
 * start_pos : 비교를 시작할 위치 return : 같으면 true, 다르면 false
 ******************************************************************************/
UTIL.CompareSize = function(str, str1, n, start_pos) {
	var str_tmp, str_tmp1;

	if ("x" + start_pos != "x") {
		str_tmp = str.substr(start_pos, n);
		str_tmp1 = str1.substr(start_pos, n);
	} else {
		str_tmp = str.substr(0, n);
		str_tmp1 = str1.substr(0, n);
	}
	return this.fnCompare(str_tmp, str_tmp1);
};

// ============================================================================
// 메소드 명 : gfn_StrCasecmp( 비교 String, 비교 String )
// 내용 설명 : 대소문자 구별안하는 String 비교함수
// RETURN 값 : 같으면 true, 다르면 false
// ============================================================================
UTIL.fnCasecmp = function(str, str1) {
	return this.fnCompare(str.toUpperCase(), str1.toUpperCase());
};

// ============================================================================
// 메소드 명 : gfn_StrNcaseCmp( 비교 String, 비교 String ,size, 비교를 시작할 위치)
// 내용 설명 : 대소문자 구별안하면서 size만큼 String 을 비교하는 함수
// RETURN 값 : 같으면 true, 다르면 false
// ============================================================================
UTIL.fnNcaseCmp = function(str, str1, n, start_pos) {
	var str_tmp, str_tmp1;

	if ("x" + start_pos != "x") {
		str_tmp = str.substr(start_pos, n);
		str_tmp1 = str1.substr(start_pos, n);
	} else {
		str_tmp = str.substr(0, n);
		str_tmp1 = str1.substr(0, n);
	}

	return this.fnCasecmp(str_tmp, str_tmp1);
};

// ============================================================================
// 메소드 명 : gfn_StrCount( 전체 문자열, 찾고자 하는 문자열)
// 내용 설명 : 문자열내에 포함된 문자열의 갯수 구하는 함수
// RETURN 값 : 찾은 문자열 갯수
// ============================================================================
UTIL.fnStrCount = function(str, count_str) {
	var i;
	var count = 0;
	var len;

	len = str.length;
	for (i = 0; i < len;) {
		if (str.substr(i, count_str.length) == count_str) {
			count++;
			i += count_str.length;
		} else
			i++;
	}
	return count;
};

// ============================================================================
// 메소드 명 : fnStrFind( 원본 String, 찾고자 하는 문자열,찾기 시작할 위치)
// 내용 설명 : 문자열내에서 문자열의 위치를 찾는 함수
// RETURN 값 : 찾은 위치
// ============================================================================
UTIL.fnStrFind = function(str, find_str, start_pos) {
	var len;

	len = str.Length();
	for (i = start_pos; i < len;) {
		if (str.substr(i, find_str.length) == find_str)
			break;
		else
			i++;
	}
	return i;
};

// ============================================================================
// 메소드 명 : fnStrFindCase( 원본 String, 찾고자 하는 문자열,찾기 시작할 위치)
// 내용 설명 : 문자열내에서 대소문자 구분없이 문자열의 위치를 찾는 함수
// RETURN 값 : 찾은 위치
// ============================================================================
UTIL.fnStrFindCase = function(str, find_str, start_pos) {
	var len;
	var sub_str;

	len = str.Length();
	for (i = start_pos; i < len;) {
		sub_str = Substr(str, i, find_str.Length());
		if (sub_str.toUpperCase() == find_str.toUpperCase())
			break;
		else
			i++;
	}
	return i;
};

// ============================================================================
// 메소드 명 : fnStrReverseFind( 원본 String, 찾고자 하는 문자열,찾기 시작할 위치)
// 내용 설명 : 문자열내에서 문자열의 위치를 끝에서 부터찾는 함수
// RETURN 값 : 찾은 위치
// ============================================================================
UTIL.fnStrReverseFind = function(str, find_str, start_pos) {
	if ("x" + start_pos == "x")
		start_pos = str.Length();

	for (i = start_pos; i >= 0;) {
		if (str.substr(i, find_str.length) == find_str)
			break;
		else
			i--;
	}
	return i;
};

// ============================================================================
// 메소드 명 : fnStrReverseFindCase( 원본 String, 찾고자 하는 문자열,찾기 시작할 위치)
// 내용 설명 : 문자열내에서 문자열의 위치를 대소문자 구분없이 끝에서 부터찾는 함수
// RETURN 값 : 찾은 위치
// ============================================================================
UTIL.fnStrReverseFindCase = function(str, find_str, start_pos) {
	var sub_str;

	if ("x" + start_pos == "x")
		start_pos = str.Length();

	for (i = start_pos; i >= 0;) {
		sub_str = str.substr(i, find_str.Length());
		if (sub_str.toUpperCase() == find_str.toUpperCase())
			break;
		else
			i--;
	}
	return i;
};

// ============================================================================
// 메소드 명 : fnStrSpliceSize
// 내용 설명 : 문자열을 전달받은 길이 만큼만 표시하고 나머지는 '...' 으로 표시
// RETURN 값 : 찾은 위치
// ============================================================================
UTIL.fnStrSpliceSize = function(str, strLength) {

	if (str == null || str == '' || str == undefined)
		return;

	var endChar = '...';

	return str.substr(0, strLength) + endChar;
};

/*******************************************************************************
 * 작성자 : 주민번호로 년대 알기
 * 
 * @param :
 *            val 주민 번호
 * @return age
 ******************************************************************************/
UTIL.fnGetBefo = function(val) {
	var lvGb = this.fnReplace(val, '-').substr(6, 1);

	if (lvGb == '1' || lvGb == '2' || lvGb == '5' || lvGb == '6') {
		return '19';
	} else if (lvGb == '3' || lvGb == '4' || lvGb == '7' || lvGb == '8') {
		return '20';
	}
};

/*******************************************************************************
 * 작성자 : 기능 : 주민번호를 입력받아 생년월일을 리턴한다.
 * 
 * @param :
 *            p_jumin_no 주민번호
 * @return : 생년월일
 ******************************************************************************/
UTIL.fnGetBirthdayOfJuminNo = function(p_jumin_no) {

	var p_jumin_no = this.fnReplace(p_jumin_no, '-');

	var birthday = "";

	if (p_jumin_no != null && p_jumin_no.length >= 7) {
		var chk_bit = p_jumin_no.substr(6, 1);
		var birth_year = "";

		if (chk_bit == "1" || chk_bit == "2" || chk_bit == "5"
				|| chk_bit == "6") {
			birth_year = "19"; // 1900년대 생
		} else if (chk_bit == "9" || chk_bit == "0") {
			birth_year = "18"; // 1800년대 생
		} else if (chk_bit == "3" || chk_bit == "4" || chk_bit == "7"
				|| chk_bit == "8") {
			birth_year = "20"; // 2000년대 생
		}

		birthday = birth_year + p_jumin_no.substr(0, 2)
				+ p_jumin_no.substr(2, 2) + p_jumin_no.substr(4, 2);
	}
	return birthday;
};

/*******************************************************************************
 * 작성자 : 기능 : 주민번호를 입력받아 0:만나이, 1:일반나이를 리턴한다. parameter : p_jumin_no 주민번호 return :
 * 만나이
 ******************************************************************************/
UTIL.fnGetAgeOfJuminNo = function(p_age_mode, p_jumin_no, sTodate) {
	var age = 0;

	if (p_jumin_no != null && p_jumin_no.length >= 7) {
		var birthday = this.fnGetBirthdayOfJuminNo(p_jumin_no);

		if (birthday.length == 8) {
			var addAge = 0; // 생일에 따른 가감을 위한 변수
			var Calender = this.fnGetToday();
			var currentYear = Calender.substr(0, 4); // 현재년
			var currentMonth = Calender.substr(4, 2); // 현재월
			var currentDay = Calender.substr(6, 2); // 현재일
			var year = birthday.substr(0, 4); // 주민번호-년
			var month = birthday.substr(4, 2); // 주민번호-월
			var day = birthday.substr(6, 2); // 주민번호-일
			// 월일 비교
			if (p_age_mode == 0) {
				if (currentMonth < month) {
					addAge = -1;
				} else if (currentMonth == month) {
					if (currentDay < day) {
						addAge = -1;
					} else {
						addAge = 0;
					}
				} else {
					addAge = 0;
				}
			} else if (p_age_mode == 1) {
				addAge = 1;
			}

			age = currentYear - year + addAge;
		}
	}
	return age;
};

/*******************************************************************************
 * 작성자 : 기능 : 원하는 길이와 타입을 입력받아 그 길이만큼의 난수를 반환한다 parameter : setType 원하는 난수 타입,
 * setSize 원하는 난수 길이 return : 난수
 ******************************************************************************/

UTIL.fnMakeHexaChar = function(setType, setSize) {

	var pattern = /^[a-zA-Z0-9]+$/;
	var str = '';

	switch (setType) {
	case '1':
		pattern = /^[0-9]+$/;
		break;
	case 'A':
		pattern = /^[A-Z]+$/;
		break;
	case 'a':
		pattern = /^[a-z]+$/;
		break;
	case 'A1':
		pattern = /^[A-Z0-9]+$/;
		break;
	case 'a1':
		pattern = /^[a-z0-9]+$/;
		break;
	default:
		pattern = /^[a-zA-Z0-9]+$/;
	}

	var rndchar = function() {
		var rnd = Math.round(Math.random() * 1000);

		if (!pattern.test(String.fromCharCode(rnd))) {
			rndchar();
		} else {
			str += String.fromCharCode(rnd);
		}
	};

	if (!/^[0-9]+$/.test(setSize))
		setSize = 0x10;

	str = '';

	for ( var i = 0; i < setSize; i++) {
		rndchar();
	}

	return str;
};

// ============================================================================
// 함수명 : fnTelMask
// 내용 설명 : 전화 번호 Mask 처리
// param 값 :
// return 값 : mask 전화
// ============================================================================
UTIL.fnTelMask = function(tel_no) {
	if( UTIL.fnIsEmpty(tel_no) || tel_no=="--" ){
		return "";
	}
	
	var strTemp = "****";
	if (this.fnIsDigit(tel_no) == false) { // 전화번호에 - 가있다면

		var arrTemp = tel_no.split("-");

		if (arrTemp.length >= 2) {
			strTemp = (arrTemp[1].length == 3) ? '***' : '****';
		}

		if (tel_no.length == 0) {
			return ("");
		} else {
			if (arrTemp.length == 1) {
				return (this.fnSubStrLeft(tel_no, tel_no.length - 4) + strTemp);
			} else if (arrTemp.length == 2) {
				return (arrTemp[0] + "-" + strTemp + "-" + this.fnSubStrRight(tel_no, 4));
			} else {
				return (arrTemp[0] + "-" + strTemp + "-" + arrTemp[2]);
			}
		}

	} else {
		if (tel_no.substr(0, 2) == "01") {
			if (tel_no.length == 10) {
				return this.fnSubStrLeft(tel_no, 3) + "-***-" + this.fnSubStrRight(tel_no, 4);
			} else {
				return this.fnSubStrLeft(tel_no, 3) + "-****-" + this.fnSubStrRight(tel_no, 4);

			}
		}
		if (tel_no.substr(0, 2) == "02") {
			if (tel_no.length == 9) {
				return this.fnSubStrLeft(tel_no, 2) + "-***-" + this.fnSubStrRight(tel_no, 4);
			} else {
				return this.fnSubStrLeft(tel_no, 2) + "-****-" + this.fnSubStrRight(tel_no, 4);

			}
		} else if (tel_no.substr(0, 2) == "03" || tel_no.substr(0, 2) == "04"
				|| tel_no.substr(0, 2) == "05" || tel_no.substr(0, 2) == "06") {

			return this.fnSubStrLeft(tel_no, 3) + "-***-" + this.fnSubStrRight(tel_no, 4);
		}

	}
};

// ============================================================================
// 함수명 : fnTelMaskLast
// 내용 설명 : 전화 번호 뒤 4자리 Mask 처리
// param 값 :
// return 값 : mask 전화
// ============================================================================
UTIL.fnTelMaskLast = function(tel_no) {
	if( UTIL.fnIsEmpty(tel_no) || tel_no=="--" ){
		return "";
	}
	
	var strTemp = "****";
	if (this.fnIsDigit(tel_no) == false) { // 전화번호에 - 가있다면
		
		var arrTemp = tel_no.split("-");
		
		if (arrTemp.length >= 2) {
			strTemp = (arrTemp[2].length == 3) ? '***' : '****';
		}
		
		if (tel_no.length == 0) {
			return ("");
		} else {
			if (arrTemp.length == 1) {
				return (this.fnSubStrLeft(tel_no, tel_no.length-4) + strTemp);
			} else if (arrTemp.length == 2) {
				return (arrTemp[0] + "-" + strTemp);
			} else {
				return (arrTemp[0] + "-" + arrTemp[1] + "-" + strTemp);
			}
		}
		
	} else {
		if (tel_no.substr(0, 2) == "01") {
			if (tel_no.length == 10) {
				return this.fnSubStrLeft(tel_no, 3) + "-" + tel_no.substr(3, 3) + "-****";
			} else {
				return this.fnSubStrLeft(tel_no, 3) + "-" + tel_no.substr(3, 4) + "-****";
			}
		}
		if (tel_no.substr(0, 2) == "02") {
			if (tel_no.length == 9) {
				return this.fnSubStrLeft(tel_no, 2) + "-" + tel_no.substr(3, 3) + "-****";
			} else {
				return this.fnSubStrLeft(tel_no, 2) + "-" + tel_no.substr(3, 4) + "-****";
				
			}
		} else if (tel_no.substr(0, 2) == "03" || tel_no.substr(0, 2) == "04"
			|| tel_no.substr(0, 2) == "05" || tel_no.substr(0, 2) == "06") {
			
			return this.fnSubStrLeft(tel_no, 3) + "-" + tel_no.substr(3, 4) + "-****";
		}
		
	}
};

// ============================================================================
// 함수명 : fnRegMask
// 내용 설명 : 주민 번호 Mask 처리
// param 값 :
// return 값 : mask 주민 번호
// ============================================================================
UTIL.fnRegMask = function(reg_no) {
	var strTemp = "******";

	if (this.fnIsDigit(reg_no) == true) { // 주민번호에 - 가없다면

		// return (this.fnSubStrLeft(reg_no,7) + strTemp);
		return (this.fnSubStrLeft(reg_no, 6) + "-" + reg_no.substr(6, 1) + strTemp);
	} else {

		reg_no = reg_no.replace("-", "");

		return (this.fnSubStrLeft(reg_no, 6) + "-" + reg_no.substr(6, 1) + strTemp);
	}
};

// ============================================================================
// 함수명 : fnRegMask
// 내용 설명 : 주민 번호 Mask 처리
// param 값 :
// return 값 : mask 주민 번호
// ============================================================================
UTIL.fnRegMaskDash = function(reg_no) {
	var strTemp = "******";

	reg_no = reg_no.replace("-", "");
	return reg_no.substring(0, 6) + "-" + reg_no.substring(6, 7) + strTemp;
};

// ============================================================================
// 함수명 : fnNameMask
// 내용 설명 : 이름 Mask 처리
// param 값 :
// return 값 : mask 이름
// ============================================================================
UTIL.fnNameMask = function(custname) {
	custname = new String(custname);
	var length = custname.length;
	var first = custname.substring(0, 1);
	var last = custname.substring(length - 1, length);
	var asterisk = '';

	for ( var i = 0; i < length - 2; i++) {
		asterisk = asterisk + '*';
	}

	custname = first + asterisk + last;
	return custname;
};

// ============================================================================
// 함수명 : fnAddrMask
// 내용 설명 : 주소 Mask 처리 ( "동 ", 동 뒤에 공백 필수)
// param 값 : String
// return 값 : mask 주소
// ============================================================================
UTIL.fnAddrMask = function(addr) {
	var strTemp = " ********";

	var indexDong = addr.indexOf("동 ");
	var indexUb = addr.indexOf("읍 ");
	var indexMyun = addr.indexOf("면 ");

	if (addr.length > 0) {
		;

		if (indexDong != -1) {
			if (indexDong >= addr.length - 6) {
				var addrLength = addr.length;
				var strTempSub = addr.substr(0, addrLength - 9);
				return strTempSub + strTemp;
			} else {
				return addr.substr(0, indexDong + 1) + strTemp;
			}
		} else if (indexUb != -1) {
			if (indexUb >= addr.length - 6) {
				var addrLength = addr.length;
				var strTempSub = addr.substr(0, addrLength - 9);
				return strTempSub + strTemp;
			} else {
				return addr.substr(0, indexUb + 1) + strTemp;
			}
		} else if (indexMyun != -1) {
			if (indexMyun >= addr.length - 6) {
				var addrLength = addr.length;
				var strTempSub = addr.substr(0, addrLength - 9);
				return strTempSub + strTemp;
			} else {
				return addr.substr(0, indexMyun + 1) + strTemp;
			}
		} else {
			var addrLength = addr.length;
			var strTempSub = addr.substr(0, addrLength - 9);
			return strTempSub + strTemp;
		}

	} else {
		return addr;
	}

};

// ============================================================================
// 함수명 : fnEmailMask
// 내용 설명 : Email Mask 처리
// param 값 :
// return 값 : mask 이메일
// ============================================================================
UTIL.fnEmailMask = function(addr) {
	var splitValue = [];
	splitValue = addr.split("@");

	return splitValue[0].substring(0, splitValue[0].length - 4) + "****@"
			+ splitValue[1];
};

// ============================================================================
// 함수명 : fnContNoMask
// 내용 설명 : 증권번호 Mask 처리
// param 값 : String 증권번호
// return 값 : mask 증권번호
// ============================================================================
UTIL.fnContNoMask = function(str) {

	/*
	 * 
	 * var strTemp01 = str.substr(0, str.length-7); var strTemp02 =
	 * str.substr(str.length-6, 3); var strTemp03 = str.substr(str.length-3);
	 */

	/*
	 * var strTemp01 = str.substr(0, 3); var strTemp02 = str.substr(3, 4); var
	 * strTemp03 = str.substr(7);
	 */

	/*
	 * if(str.length >= 7){ return strTemp01 + "****" + strTemp03; }else{ return
	 * strTemp01 + "****"; }
	 */

	while (str.length != str.replace("-", "").length) {
		str = str.replace("-", "");
	}

	var length = str.length;

	if (length === 12) {
		return str.substring(0, 5) + "****" + str.substring(9);
	} else if (length === 9) {
		return str.substring(0, 3) + "****" + str.substring(7);
	} else {
		return str;
	}

};

// ============================================================================
// 함수명 : fnLastNoMaskFour
// 내용 설명 : 마지막 4자리 Mask - 계좌번호, 사업자번호
// param 값 : String ( "-" 가능 )
// return 값 : mask String
// ============================================================================
UTIL.fnLastNoMaskFour = function(value) {

	var cnt = 0;
	var rst = '';
	var strTemp = value.split("");


	for ( var i = strTemp.length - 1; i > -1, cnt < 4; i--) {
		if (strTemp[i] != '-') {
			strTemp[i] = '*';
			cnt++;
		}
	}
	;

	return strTemp.join('');

};

// ============================================================================
// 함수명 : fnMoneyMaskAll
// 내용 설명 : 모든 자리 Mask
// param 값 : String ( "," 가능 )
// return 값 : ("," 가 있는 ) Mask String
// ============================================================================
UTIL.fnMoneyMaskAll = function(value) {

	/*
	 * var strTemp = UTIL.fnFilterNum(value);
	 * 
	 * var retTemp = '';
	 * 
	 * for (var i=0; i < strTemp.length; i++) { retTemp += '*'; };
	 * 
	 * return UTIL.fnMakeMoney(retTemp);
	 */

	return '***';

};


//============================================================================
//함수명 : fnLoanNoMask
//내용 설명 : 대출번호 mask 처리 (앞3, ****.., 뒤5)
//param 값 : 치환 대상 번호
//return 값 : '*'가 포함된 숫자열
//============================================================================
UTIL.fnLoanNoMask = function(str) {

	if (fnc_isBlankNull(str)) {
		str = "";
		return str;
	} else {
		str = str.trim();
	}
	
	var totL = str.length;
	var endL = totL - 5;
	var mLength = totL - 8;

	
	var mString = '';
	var mChar = '*';
	for ( var i = 0; i < mLength; i++) {
		mString += mChar;
	}
	
	var result = str.substring(0, 3) + mString + str.substring(endL);
	return result;	

};


//============================================================================
//함수명 : fnLoanAccountNoMask
//내용 설명 : 대출번호 mask 처리 (앞5, ****.., 뒤3)
//param 값 : 치환 대상 번호
//return 값 : '*'가 포함된 숫자열
//============================================================================
UTIL.fnLoanAccountNoMask = function(str) {

	if (fnc_isBlankNull(str)) {
		str = "";
		return str;
	} else {
		str = str.trim();
	}
	
	var totL = str.length;
	var endL = totL - 3;
	var mLength = totL - 8;

	
	var mString = '';
	var mChar = '*';
	for ( var i = 0; i < mLength; i++) {
		mString += mChar;
	}
	
	var result = str.substring(0, 5) + mString + str.substring(endL);
	return result;	

};

//============================================================================
//함수명 : fnInsuNoMask
//내용 설명 : 계좌/보험번호의 가운데 자리를 '*'로 * 마스킹처리한다.
//param 값 : 치환 대상 번호
//return 값 : '*'가 포함된 숫자열
//============================================================================
UTIL.fnInsuNoMask = function(str) {
	
	/*
	var totLength = str.length;
	var end = totLength - 3;
	var maskLength = totLength - 8;
	var start = totLength - (maskLength + 3) + 1;

	var maskString = '';
	var maskChar = '*';
	for ( var i = 0; i < maskLength; i++) {
		maskString += maskChar;
	}
	var result = str.substring(0, start) + maskString + str.substring(end);
	return result;
	*/
	if (fnc_isBlankNull(str)) {
		str = "";
		return str;
	} else {
		str = str.trim();
	}
	
	var totL = str.length;
	var endL = totL - 3;
	var mLength = totL - 8;

	
	var mString = '';
	var mChar = '*';
	for ( var i = 0; i < mLength; i++) {
		mString += mChar;
	}
	
	var result = str.substring(0, 5) + mString + str.substring(endL);
	return result;	
	

};

// ============================================================================
// 함수명 : fnDateMaskDay
// 내용 설명 : 연월일에서 일 Mask 2012-01-01 -> 2012-01-**
// param 값 : String (2012-01-01)
// return 값 : Mask String (2012-01-**)
// ============================================================================
UTIL.fnDateMaskDay = function(value) {

	if (this.fnIsDigit(value) == false) {

		var strTemp = value.substr(0, 8);

		return strTemp + '**';

	} else {

		var strTemp01 = value.substr(0, 4);
		var strTemp02 = value.substr(4, 2);
		var strTemp03 = value.substr(6);

		return strTemp01 + '-' + strTemp02 + '-' + '**';
	}

};

// ============================================================================
// 함수명 : fnMaskViewChanger_CallBack_hidden
// 내용 설명 : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복 - Hidden 사용 시
// param 값 : String (viewId, hiddenId))
// return 값 :
// ============================================================================
UTIL.fnMaskViewChanger_CallBack_hidden = function(viewId, hiddenId) {
	$('#' + viewId).css('display', "none");
	$('#' + hiddenId).css('display', "");
};

// ============================================================================
// 함수명 : fnMaskViewChanger_hidden
// 내용 설명 : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복 - Hidden 사용 시
// param 값 : String (viewId, hiddenId))
// return 값 :
// ============================================================================
UTIL.fnMaskViewChanger_hidden = function(viewId, hiddenId) {

	$('#' + viewId).css('display', "");
	$('#' + hiddenId).css('display', "none");

	setTimeout("UTIL.fnMaskViewChanger_CallBack('" + viewId + "','" + hiddenId
			+ "')", 1000 * 5);
};

// ============================================================================
// 함수명 : fnMaskViewChanger_CallBack
// 내용 설명 : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복
// param 값 : String (viewId, tempValue))
// return 값 :
// ============================================================================
UTIL.fnMaskViewChanger_CallBack = function(viewId, tempValue) {
	$('#' + viewId).text(tempValue);
	$('#' + viewId).attr('isasta', 'false');
};

// ============================================================================
// 함수명 : fnMaskViewChanger
// 내용 설명 : 마스킹된 데이터를 정상데이터로 5초간 표시 후 원복
// param 값 : String (viewId, tempValue))
// return 값 :
// ============================================================================
UTIL.fnMaskViewChanger = function(viewId, value) {

	var tempValue = $('#' + viewId).text();

	if ($('#' + viewId).attr('isasta') != 'true') {

		$('#' + viewId).text(value);
		$('#' + viewId).attr('subbang', 'true')
		setTimeout("UTIL.fnMaskViewChanger_CallBack('" + viewId + "','"
				+ tempValue + "')", 1000 * 5);

	}

};

/*******************************************************************************
 * *********************************************************************************************+++
 * 2. 숫자 함수들의 모음
 ******************************************************************************/
// ///////////////////////////////////////////////////
// 숫자, 백스페이스, tab, 엔터, delete, comma 키만을 기입받게 하는 방법
// ///////////////////////////////////////////////////
UTIL.fnKeyCheck = function(e) {
	var keyValue = null;
	// if (n4) {
	// keyValue = e.which;
	// }
	// else if (e4) {
	// keyValue = event.keyCode;
	// }
	keyValue = e.which;
	if (((keyValue >= 48) && (keyValue <= 57)) || keyValue == 8
			|| keyValue == 9 || keyValue == 13 || keyValue == 44)
		return true;
	else
		return false;
};

// ///////////////////////////////////////////////////
// 숫자, 백스페이스, tab, 엔터, delete, - 키만을 기입받게 하는 방법
// ///////////////////////////////////////////////////
UTIL.fnKeyCheckMinus = function(e) {
	var keyValue = null;
	if (n4)
		keyValue = e.which;
	else if (e4)
		keyValue = event.keyCode;

	if (((keyValue >= 48) && (keyValue <= 57))
			|| ((keyValue >= 96) && (keyValue <= 105)) || keyValue == 8
			|| keyValue == 9 || keyValue == 13 || keyValue == 45)
		return true;
	else
		return false;
};

// ///////////////////////////////////////////////////
// 숫자및돗트입력(onKeypress='return keyCheckDot(event)')
// ///////////////////////////////////////////////////
UTIL.fnKeyCheckDot = function(e) {
	var keyValue = null;
	if (n4)
		keyValue = e.which;
	else if (e4)
		keyValue = event.keyCode;

	if (((keyValue >= 48) && (keyValue <= 57))
			|| ((keyValue >= 96) && (keyValue <= 105)) || keyValue == 13
			|| keyValue == 46)
		return true;
	else
		return false;
};

// ///////////////////////////////////////////////////
// 숫자및돗트입력(onKeypress='return keyCheckMinusDot(event)')
// ///////////////////////////////////////////////////
UTIL.fnKeyCheckMinusDot = function(e) {
	var keyValue = null;
	if (n4)
		keyValue = e.which;
	else if (e4)
		keyValue = event.keyCode;

	if (((keyValue >= 48) && (keyValue <= 57)) || keyValue == 13
			|| keyValue == 45 || keyValue == 46)
		return true;
	else
		return false;
};

// ///////////////////////////////////////////////////
// 돈(3단위마다 컴마를 붙인다.)
// ///////////////////////////////////////////////////
UTIL.fnCheckNumber = function() {
	var ob = event.srcElement;
	ob.value = UTIL.fnFilterNum(ob.value);
	ob.value = UTIL.fnCommaSplitAndNumberOnly(ob);

	return false;
};

// ///////////////////////////////////////////////////
// 한정액(일정금액 이상이 되면 올라기지 않게 한다.)
// ///////////////////////////////////////////////////
UTIL.fnChkhando = function(money) {
	var ob = event.srcElement;
	ob.value = UTIL.fnNoSplitAndNumberOnly(ob);
	if (ob.value > money)
		ob.value = money;
	return false;
};

// ///////////////////////////////////////////////////
// 이자율(소수점 사용가능)
// ///////////////////////////////////////////////////
UTIL.fnCheckNumberDot = function(llen, rlen) {
	if (llen == "")
		llen = 8;
	if (rlen == "")
		rlen = 2;
	var ob = event.srcElement;
	ob.value = UTIL.fnFilterNum(ob.value);

	spnumber = ob.value.split('.');
	if (spnumber.length >= llen
			&& (spnumber[0].length > llen || spnumber[1].length > llen)) {
		ob.value = spnumber[0].substring(0, llen) + "."
				+ spnumber[1].substring(0, rlen);
		ob.focus();

		return false;
	} else if (spnumber[0].length > llen) {
		ob.value = spnumber[0].substring(0, llen) + ".";
		ob.focus();

		return false;
	} else if (ob.value && spnumber[0].length == 0) {
		ob.value = 0 + "." + spnumber[1].substring(0, rlen);
		ob.focus();

		return false;
	}

	ob.value = UTIL.fnCommaSplitAndAllowDot(ob);
	return false;
};

// ///////////////////////////////////////////////////
// 참조함수
// ///////////////////////////////////////////////////
UTIL.fnFilterNum = function(str) {
	re = /^$|,/g;

	return str.replace(re, "");
};

// ///////////////////////////////////////////////////
// 참조함수(컴마불가)
// ///////////////////////////////////////////////////
UTIL.CommaSplitAndNumberOnly = function(ob) {
	var txtNumber = '' + ob.value;
	txtNumber = txtNumber.replace(/[^0-9.]/g, "");

	if (isNaN(txtNumber) || txtNumber.indexOf('.') != -1) {
		//alert("잘못된 형식입니다. 다시 입력해주십시요.");
		MAIN.showDimmPopup(1, "잘못된 형식입니다. 다시 입력해주십시요.");
		ob.value = "";
		ob.focus();

		return ob.value;
	} else {
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = txtNumber.split('.');
		arrNumber[0] += '.';

		do {
			arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		} while (rxSplit.test(arrNumber[0]));

		if (arrNumber.length > 1) {
			return arrNumber.join('');
		} else {
			return arrNumber[0].split('.')[0];
		}
	}
};

// ///////////////////////////////////////////////////
// 참조함수(컴마가능)
// ///////////////////////////////////////////////////
UTIL.fnCommaSplitAndAllowDot = function(ob) {
	var txtNumber = '' + ob.value;

	if (isNaN(txtNumber)) {
		//alert("잘못된 형식입니다. 다시 입력해주십시요.");
		MAIN.showDimmPopup(1, '잘못된 형식입니다. 다시 입력해주십시요.');
		ob.value = "";
		ob.focus();

		return ob.value;
	} else {
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = txtNumber.split('.');
		arrNumber[0] += '.';

		do {
			arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		} while (rxSplit.test(arrNumber[0]));

		if (arrNumber.length > 1) {
			return arrNumber.join('');
		} else {
			return arrNumber[0].split('.')[0];
		}
	}
};

// ///////////////////////////////////////////////////
// 숫자만가능
// ///////////////////////////////////////////////////
UTIL.fnNoSplitAndNumberOnly = function(ob) {
	var txtNumber = '' + ob.value;

	if (isNaN(txtNumber) || txtNumber.indexOf('.') != -1) {
		ob.value = ob.value.substring(0, ob.value.length - 1);
		ob.focus();

		return ob.value;
	} else
		return ob.value;
};

// ///////////////////////////////////////////////////
// 바이트검사
// ///////////////////////////////////////////////////
UTIL.fnByte = function(input) {
	var i, j = 0;

	for (i = 0; i < input.length; i++) {
		val = escape(input.charAt(i)).length;
		if (val == 6)
			j++;
		j++;
	}

	return j;
};

// ///////////////////////////////////////////////////
// 소수점이하 숫자의 반올림
// ///////////////////////////////////////////////////
UTIL.fnFRound = function(obj, pos) {
	var rtn;
	var val = UTIL.fnFilterNum(obj.value);

	rtn = Math.round(val * Math.pow(10, Math.abs(pos) - 1));
	rtn = rtn / Math.pow(10, Math.abs(pos) - 1);

	if (rtn == 0)
		rtn = "";

	obj.value = rtn;
};

/**
 * 소수점이하의 숫자를 버리고 정수만 리턴한다.
 */
UTIL.fnFRoundInteger = function(str) {
	var strData = str + "";
	if (UTIL.fnIsFloat(strData)){
		return strData.split(".")[0];
	} else {
		return str;
	}
	
	return str;
};

/////////////////////////////////////////////////////
// 소수점 이하 임의의 자리에서 내림
// str : 문자열 형태의 숫자
// pos : 출력될 자릿수
/////////////////////////////////////////////////////
UTIL.fnFloor = function(str, pos) {
	var rtn = str;
	var str = (rtn+'').split('.');
	//소수점이 정해진 자릿수보다 적은 경우 0을 붙여서 리턴
	if((rtn+'').indexOf('.') != -1){
		var num = str[1].length;
		if(num < pos){
			for(var i=0;i<pos-num;i++){
				rtn += '0';
			}
		}
		else if(num > pos){
			rtn = str[0] +'.'+ str[1].substring(0,2);
		}
	}
	else{
		rtn += '.';
		for(var i=0;i<pos;i++){
			rtn += '0';
		}
	}
	
	if(str[0].length == 0){
		rtn = '0'+rtn;
	}
	return rtn;
};

// ///////////////////////////////////////////////////
// isDigit : 입력된 문자가 숫자인가?
// ///////////////////////////////////////////////////
// < Input >
// c -- 문자
// ///////////////////////////////////////////////////
// < Output >
// isDigit : true,false
// ///////////////////////////////////////////////////
UTIL.fnIsDigit = function(str) {
	var i;
	var len;
	var c;

	len = str.length;
	for (i = 0; i < len; i++) {
		c = str[i];
		if ((i == 0 && c == '-') || (c >= '0' && c <= '9'))
			;
		else
			return false;
	}
	return true;
};

// ///////////////////////////////////////////////////
// isInteger : 입력된 문자열이 숫자만으로 구성되었는가?
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// ///////////////////////////////////////////////////
// < Output >
// isInteger : true,false
// ///////////////////////////////////////////////////
UTIL.fnIsInteger = function(str) {
	var i;

	if (UTIL.fnIsEmpty(str))
		return false;

	for (i = 0; i < str.length; i++) {
		// Check that current character is number.
		var c = str.charAt(i);

		if (!UTIL.fnIsDigit(c))
			return false;
	}

	// All characters are numbers.
	return true;
};

// ///////////////////////////////////////////////////
// isFloat : 입력된 문자열이 .와 숫자만으로 구성되었는가?
// ///////////////////////////////////////////////////
// < Input >
// str -- 문자열
// ///////////////////////////////////////////////////
// < Output >
// isFloat : true,false
// ///////////////////////////////////////////////////
UTIL.fnIsFloat = function(str) {
	var i, cnt;

	cnt = 0;

	if (UTIL.fnIsEmpty(str))
		return false;

	for (i = 0; i < str.length; i++) {
		// Check that current character is number.
		var c = str.charAt(i);

		if (!UTIL.fnIsDigit(c)) {
			if (c == ".")
				if (cnt > 1)
					return false;
				else
					cnt++;
			else
				return false;
		}
	}

	return true;
};

/*
 * InputBox 에 KeyIn 시 숫자유효성을 체크하고 숫자 포맷(Comma를 보여줌) 으로 표현 @oInput: Number
 * InputBox @iType : 1-일반, 2-0이면 공백으로 @return :
 */
UTIL.fnSetFocusoutNumber = function(oInput, iType) {

	var strNum = UTIL.fnTrim(oInput.value);
	if (strNum == '')
		return true;

	strNum = UTIL.fnComReplace(strNum, ",", "");

	var iNum = Number(strNum);

	if (isNaN(iNum)) {
		//alert("숫자 유효성 오류입니다.");
		MAIN.showDimmPopup(1, '숫자 유효성 오류입니다.');
		oInput.select();
		return false;
	}

	// 콤마셋팅
	UTIL.fnSetCommaObj(iNum.toString(), oInput);
	iType = Number(iType);
	if ((iType == 2 || iType == 3) && iNum == 0) {
		oInput.value = "";
	}

	if (iType == 3 && iNum != 0) {
		oInput.value = strNum;
	}

	return true;
};

/**
 * 입력문자 숫자로 변환 (공백이면 0으로 셋팅)
 * 
 * @strInput : 입력문자열
 * @return : 숫자로 변환
 */
UTIL.fnGetParseNumber = function(strInput) {
	var iResult = 0;
	if (strInput == undefined) {
		iResult = 0;
	} else {
		strInput = strInput.toString();
		if (strInput == "") {
			iResult = 0;
		} else {
			iResult = Number(UTIL.fnFilterNum(strInput));
		}
	}
	return iResult;
};

/*******************************************************************************
 * *********************************************************************************************+++
 * 3.날자 함수들의 모음
 ******************************************************************************/
// ///////////////////////////////////////////////////
// isLeapYear : 윤년인지를 점검
// ///////////////////////////////////////////////////
// < Input >
// year -- 년도에 해당하는 숫자
// ///////////////////////////////////////////////////
// < Output >
// isLeapYear : true : 윤년
// false : 평년
// ///////////////////////////////////////////////////
UTIL.fnIsLeapYear = function(Year) {
	if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
		return (true);
	} else {
		return (false);
	}
};

// ///////////////////////////////////////////////////
// getDaysInMonth : 입력 월,년에 해당하는 일수를 계산
// ///////////////////////////////////////////////////
// < Input >
// month -- 달에 해당하는 숫자
// year -- 년도에 해당하는 숫자
// ///////////////////////////////////////////////////
// < Output >
// getDaysInMonth : 해당년도 달의 날짜수
// ///////////////////////////////////////////////////
UTIL.fnGetDaysInMonth = function(month, year) {
	var days = 31;

	if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8
			|| month == 10 || month == 12)
		days = 31;
	else if (month == 4 || month == 6 || month == 9 || month == 11)
		days = 30;
	else if (month == 2) {
		if (UTIL.fnIsLeapYear(year)) {
			days = 29;
		} else {
			days = 28;
		}
	}

	return days;
};

// ///////////////////////////////////////////////////
// isDate : 입력된 문자열이 YYYYMMDD의 날짜형식인가?
// ///////////////////////////////////////////////////
// < Input >
// curdate -- "YYYYMMDD" 형식의 날짜 스트링
// ///////////////////////////////////////////////////
// < Output >
// isDate : ture : 날짜
// false : 날짜아님
// ///////////////////////////////////////////////////
UTIL.fnIsDate = function(curdate) {
	var i, year, month, day;

	if (curdate.length < 8)
		return false;

	for (i = 0; i < curdate.length; i++) {
		if ((curdate.charAt(i) < "0") || (curdate.charAt(i) > "9")) {
			return false;
		}
	}

	if (UTIL.fnL_Trim(curdate.substring(0, 4), "0").length == 0)
		return false;
	else
		year = parseInt(UTIL.fnL_Trim(curdate.substring(0, 4), "0"));

	if (UTIL.fnL_Trim(curdate.substring(4, 6), "0").length == 0)
		return false;
	else
		month = parseInt(UTIL.fnL_Trim(curdate.substring(4, 6), "0"));

	if (UTIL.fnL_Trim(curdate.substring(6, 8), "0").length == 0)
		return false;
	else
		day = parseInt(UTIL.fnL_Trim(curdate.substring(6, 8), "0"));

	if (month > 12)
		return false;

	if (day > UTIL.fnGetDaysInMonth(month, year))
		return false;

	return true;
};

// ///////////////////////////////////////////////////
// isTime : 입력된 문자열이 HHMM의 시간형식인가?
// ///////////////////////////////////////////////////
// < Input >
// curtime -- "HHMM" 형식의 날짜 스트링
// ///////////////////////////////////////////////////
// < Output >
// isTime : ture : 시간
// false : 시간아님
// ///////////////////////////////////////////////////
UTIL.fnIsTime = function(curtime) {
	var i, hour, minu;

	if (curtime.length < 4)
		return false;

	for (i = 0; i < curtime.length; i++) {
		if ((curtime.charAt(i) < "0") || (curtime.charAt(i) > "9"))
			return false;
	}

	if (UTIL.fnL_Trim(curtime.substring(0, 2), "0").length == 0)
		return false;
	else
		hour = parseInt(UTIL.fnL_Trim(curtime.substring(0, 2), "0"));

	minu = parseInt(UTIL.fnL_Trim(curtime.substring(2, 4), "0"));

	if (hour > 23)
		return false;

	if (minu > 59)
		return false;

	return true;
};

// ///////////////////////////////////////////////////
// SetFormatDate : input tag object를 받아서 value의 문자열(YYYYMMDD 형식)을 YYYY.MM.DD 형식으로 변환
// ///////////////////////////////////////////////////
UTIL.fnSetFormatDate = function(_this) {
	var date = UTIL.fnReplace(_this.value, "-");
	date = UTIL.fnReplace(date, ".");

	if (date == "") {
		_this.value = "";
		return true;
	}

	if (UTIL.fnIsDate(date) == false) {
		//alert('올바른 날짜를 입력하여 주십시오.\n\n 예)20170101');
		MAIN.showDimmPopup(1, '올바른 날짜를 입력하여 주십시오.\n\n 예)20170101');
		_this.value = "";
		_this.focus();

		return false;
	}

	year = date.substring(0, 4);
	month = date.substring(4, 6);
	day = date.substring(6, 8);

	_this.value = year + "." + month + "." + day;
	return true;
};

// ///////////////////////////////////////////////////
// SetFormatDateStr : 문자열(YYYYMMDD 형식)을 YYYY.MM.DD 형식으로 변환
// ///////////////////////////////////////////////////
UTIL.fnSetFormatDateStr = function(value) {
	var date = UTIL.fnReplace(value, "-");
	date = UTIL.fnReplace(date, ".");
	
	if (date == "") {
		return;
	}
	
	if (UTIL.fnIsDate(date) == false) {
		//alert('올바른 날짜를 입력하여 주십시오.\n\n 예)20170101');
		MAIN.showDimmPopup(1, '올바른 날짜를 입력하여 주십시오.\n\n 예)20170101');
		return;
	}
	
	year = date.substring(0, 4);
	month = date.substring(4, 6);
	day = date.substring(6, 8);
	
	value = year + "." + month + "." + day;
	return value;
};

/////////////////////////////////////////////////////
//SetFormatDateYYYYMM : 문자열(YYYYMM 형식)을 YYYY.MM 형식으로 변환
/////////////////////////////////////////////////////
UTIL.fnSetFormatDateYYYYMM = function(value) {
	if(value === null || value.length !== 6){
		return value;
	}
	
	var date = UTIL.fnReplace(value, "-");
	date = UTIL.fnReplace(date, ".");
	
	year = date.substring(0, 4);
	month = date.substring(4, 6);
	
	value = year + "." + month;
	return value;
};

// ///////////////////////////////////////////////////
// SetFormatTime : HHMM 형식으로 입력한 문자열을 HH : MM 형식으로 변환
// ///////////////////////////////////////////////////
UTIL.fnSetFormatTime = function(time) {
	/*
	 * var time = UTIL.fnReplace(_this.value, " : ");
	 * 
	 * if (time == "") return true;
	 * 
	 * if (UTIL.fnIsTime(time) == false) { alert('올바른 시간을 입력하여주십시요'); return
	 * false; };
	 * 
	 * hour = time.substring(0, 2); minu = time.substring(2, 4);
	 * 
	 * _this.value = hour + " : " + minu;
	 */

	var tempTime = UTIL.fnReplace(time, ":");

	if (tempTime == '' || tempTime == undefined
			|| UTIL.fnIsTime(tempTime) == false) {
		return '올바른 시간을 입력하여주십시요';
	}
	;

	hour = tempTime.substring(0, 2);
	min = tempTime.substring(2, 4);

	return hour + ':' + min;

};

// //////////////////////////////////////////////////
// fnMakeDateFormat : yyyyMMdd 형식으로 문자열을 yyyy-mm-dd반환 , yyyy-mm-dd 형식의 문자열을
// yyyymmdd로 반환
// ///////////////////////////////////////////////////
// < Input >
// pdate -- 변환할 날짜
// ///////////////////////////////////////////////////
// < Output >
// yyyymmdd 형식이었으면 yyyy.mm.dd로, yyyy.mm.dd 형식이었으면 yyyymmdd로 반환
// ///////////////////////////////////////////////////
UTIL.fnMakeDateFormat = function(pdate) {
	var yy, mm, dd, yymmdd;
	var ar;
	
	// 잘못된 값이 들어왔을 경우 빈String을 리턴한다. - 2012.09.26 : 정헌태 : 추가
	if (pdate == null || pdate == "" || pdate == undefined) {
		return "";
	}

	pdate = pdate + '';

	if (pdate.indexOf("-") > -1) {
		// yyyy-mm-dd
		ar = pdate.split("-");
		yy = ar[0];
		mm = ar[1];
		dd = ar[2];
		if (typeof (dd) == "undefined") {
			yymmdd = yy + mm;
		} else {
			yymmdd = yy + mm + dd;
		}

	} else if (pdate.indexOf(".") > -1) {
		// yyyy-mm-dd
		ar = pdate.split(".");
		yy = ar[0];
		mm = ar[1];
		dd = ar[2];
		if (typeof (dd) == "undefined") {
			yymmdd = yy + mm;
		} else {
			yymmdd = yy + mm + dd;
		}

	} else if (pdate.length == 8 || pdate.length == 6) {
		yy = pdate.substr(0, 4);
		mm = pdate.substr(4, 2);
		dd = pdate.substr(6, 2);
		if (typeof (dd) == "undefined" || dd == "") {
			yymmdd = yy + "." + mm;
		} else {
			yymmdd = yy + "." + mm + "." + dd;
		}
	}
	return yymmdd;
};

// ///////////////////////////////////////////////////
// fnGetToday : yyyyMMdd, yyyyMM 형식으로 문자열을 반환
// ///////////////////////////////////////////////////
// < Input >
// paramSliceChar -- 문자열 사이에 들어갈 Charcter
// type --- 일자까지 나오게 할경우 d 이거나 "" , 달까지만 나오게 할경우 m
// ///////////////////////////////////////////////////
// < Output >
// today -- type="d" or "" yyyyMMdd 형식의 오늘날짜, type="m" yyyyMM 형식의 오늘날짜.
// ///////////////////////////////////////////////////
UTIL.fnGetToday = function(paramSliceChar, type) {
	if (paramSliceChar == null || paramSliceChar == ''
			|| paramSliceChar == undefined) {
		paramSliceChar = '';
	}
	var date = new Date();
	var month = (date.getMonth() + 1);
	var todate = date.getDate();
	var toYear = date.getFullYear();
	if (month < 10) {
		month = "" + "0" + month;
	}
	if (todate < 10) {
		todate = "" + "0" + todate;
	}

	var today
	if (type == "m") {
		today = "" + toYear + paramSliceChar + month;
	} else {
		today = "" + toYear + paramSliceChar + month + paramSliceChar + todate;
	}
	return today;
};

// ///////////////////////////////////////////////////
// fnDayCalculator : 기준날짜에서 날짜를 가감하여 반환
// ///////////////////////////////////////////////////
// < Input >
// pInterval -- 계산할 날짜가 일단위이면 "d", 달 단위이면 "m"을 입력
// pAddVal -- 가감할 날짜나 달 단위를 입력
// pYyyymmdd -- 기준 날짜 입력
// pDelimiter -- 년, 월, 일 사이에 구분을 할 스트링 입력 ex) "-"
// ///////////////////////////////////////////////////
// < Output >
// today -- 계산되어진 날짜
// ///////////////////////////////////////////////////
UTIL.fnDayCalculator = function(pInterval, pAddVal, pYyyymmdd, pDelimiter) {

	var yyyy;
	var mm;
	var dd;
	var cDate;
	var oDate;
	var cYear, cMonth, cDay;

	if (pDelimiter != "") {
		pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	}

	yyyy = pYyyymmdd.substr(0, 4);
	mm = pYyyymmdd.substr(4, 2);
	dd = pYyyymmdd.substr(6, 2);

	if (pInterval == "yyyy") {
		yyyy = (yyyy * 1) + (pAddVal * 1);
	} else if (pInterval == "m") {
		mm = (mm * 1) + (pAddVal * 1);
	} else if (pInterval == "d") {
		dd = (dd * 1) + (pAddVal * 1);
	}

	cDate = new Date(yyyy, mm - 1, dd) // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된
	// 날짜가 만들어짐.
	cYear = cDate.getFullYear();
	cMonth = cDate.getMonth() + 1;
	cDay = cDate.getDate();

	cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	cDay = cDay < 10 ? "0" + cDay : cDay;
	
	//연도, 월계산시 하루 더 빼줌
	if (pInterval == "yyyy" || pInterval == "m") {
		return UTIL.fnDayCalculator("d", "1", cYear.toString() + cMonth.toString() + cDay.toString(), pDelimiter)
	}
	
	if (pDelimiter != "") {
		return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	} else {
		return cYear.toString() + cMonth.toString() + cDay.toString();
	}


};

/**
 * 두 날짜사이의 일수를 구함
 */
UTIL.fnCaldays = function(stDate, edDate) {
	
	var stDate = UTIL.fnMakeDateFormat(fnc_makeNumberOnly(stDate));
	var edDate = UTIL.fnMakeDateFormat(fnc_makeNumberOnly(edDate));
	
	var fromDt = stDate.split('.');
	var toDt = edDate.split('.');
	
	var startDate = new Date(fromDt[0], Number(fromDt[1])-1, fromDt[2]);
	var endDate = new Date(toDt[0], Number(toDt[1])-1, toDt[2]);
	
	return (endDate - startDate) / 1000 / 60 / 60 / 24;
	
};

/*******************************************************************************
 * *********************************************************************************************+++
 * 4.기타 함수들의 모음
 ******************************************************************************/
// ///////////////////////////////////////////////////
// 주민번호 관련 체크 함수
// ///////////////////////////////////////////////////
// 주민번호 xxxxxx-xxxxxxx 형식으로 변환
UTIL.fnSetFormatJumin = function(_this) {
	var jumin = UTIL.fnReplace(_this.value, "-");

	if (jumin == "")
		return true;

	_this.value = jumin.substr(0, 6) + "-" + jumin.substr(6, 13);
};

// 앞자리와 뒷자리 각각 입력시 체크
UTIL.fnFChkJumin = function(Obj1, Obj2) {

	if (Obj1.value == "") {
		//alert('주민등록번호의 앞자리부터 입력을 하십시오.');
		MAIN.showDimmPopup(1, '주민등록번호의 앞자리부터 입력을 하십시오.');
		Obj1.focus();

		return false;
	}
};

// 주민번호 유효성 체크, 앞자리 뒷자리 구분시
UTIL.fnFComChkReg = function(_this1, _this2) {
	var chk = 0;
	var vMsg = "유효한 주민등록번호가 아닙니다.\n\n잘못 입력한 경우 '취소'버튼을 클릭하고\n\n정확히 입력한 경우 '확인'버튼을 클릭하십시오.";
	var vRegNo1 = _this1.value;
	var vRegNo2 = _this2.value;
	var vRegNo = vRegNo1 + vRegNo2;
	var mm = vRegNo1.substring(2, 4);
	var dd = vRegNo1.substring(4, 6);
	var sex = vRegNo2.substring(0, 1);

	if (vRegNo.trim() == "") {
		return true;
	}

	if (vRegNo.length != 13) {
		if (_this1.value != "" && _this2.value != "") {
			//alert("주민등록번호는 13자리를 입력하십시오.");
			MAIN.showDimmPopup(1, '주민등록번호는 13자리를 입력하십시오.');
			_this1.focus();

			return false;
		} else if (_this1.value != "" && _this2.value == "") {
			return false;
		} else if (_this1.value == "" && _this2.value != "") {
			return false;
		}
	}

	if (mm < 1 || mm > 12 || dd < 1) {
		if (confirm(vMsg)) {
			return true;
		} else {
			_this1.focus();

			return false;
		}
	}

	if ((sex != 1 && sex != 2 && sex != 3 && sex != 4) || (vRegNo2.length != 7)) {
		if (confirm(vMsg)) {
			return true;
		} else {
			_this1.focus();

			return false;
		}
	}

	for ( var i = 0; i <= 5; i++) {
		chk = chk + ((i % 8 + 2) * parseInt(vRegNo1.substring(i, i + 1)));
	}

	for ( var i = 6; i <= 11; i++) {
		chk = chk + ((i % 8 + 2) * parseInt(vRegNo2.substring(i - 6, i - 5)));
	}

	chk = 11 - (chk % 11);
	chk = chk % 10;

	if (chk != vRegNo2.substring(6, 7)) {
		if (confirm(vMsg)) {
			return true;
		} else {
			_this1.focus();

			return false;
		}
	}

	return true;
};

// 주민번호 유효성 체크, 13자리로 입력시
UTIL.fnFComChkReg2 = function(jumin_no) {
	var chk = 0;
	var vRegNo1 = jumin_no.substring(0, 6);
	var vRegNo2 = jumin_no.substring(6, 13);
	var vRegNo = jumin_no;
	var mm = vRegNo1.substring(2, 4);
	var dd = vRegNo1.substring(4, 6);
	var sex = vRegNo2.substring(0, 1);

	if (vRegNo.trim() == "") {
		return false;
	}

	if (vRegNo.length != 13) {
		return false;
	}

	if (mm < 1 || mm > 12 || dd < 1) {
		return false;
	}

	if ((sex != 1 && sex != 2 && sex != 3 && sex != 4) || (vRegNo2.length != 7)) {
		return false;
	}

	for ( var i = 0; i <= 5; i++) {
		chk = chk + ((i % 8 + 2) * parseInt(vRegNo1.substring(i, i + 1)));
	}

	for ( var i = 6; i <= 11; i++) {
		chk = chk + ((i % 8 + 2) * parseInt(vRegNo2.substring(i - 6, i - 5)));
	}

	chk = 11 - (chk % 11);
	chk = chk % 10;

	if (chk != vRegNo2.substring(6, 7)) {
		return false;
	}

	return true;
};

// ///////////////////////////////////////////////////
// 주민등록번호 형식 확인
// ///////////////////////////////////////////////////
UTIL.fnJuminFormatChk = function(val) {
	if (val.length < 13) {
		return "N";
	}
	var hap = 0;
	var namegi = 0;

	var num1 = val.charAt(0);
	var num2 = val.charAt(1);
	var num3 = val.charAt(2);
	var num4 = val.charAt(3);
	var num5 = val.charAt(4);
	var num6 = val.charAt(5);

	var num7 = val.charAt(6);
	var num8 = val.charAt(7);
	var num9 = val.charAt(8);
	var num10 = val.charAt(9);
	var num11 = val.charAt(10);
	var num12 = val.charAt(11);
	var num13 = val.charAt(12);

	hap += eval(num1) * (0 + 2);
	hap += eval(num2) * (1 + 2);
	hap += eval(num3) * (2 + 2);
	hap += eval(num4) * (3 + 2);
	hap += eval(num5) * (4 + 2);
	hap += eval(num6) * (5 + 2);

	hap += eval(num7) * 8;
	hap += eval(num8) * 9;
	hap += eval(num9) * 2;
	hap += eval(num10) * 3;
	hap += eval(num11) * 4;
	hap += eval(num12) * 5;

	namegi = eval(hap) % 11;

	if (eval(namegi) == 0) {
		if (eval(num13) != 1) {
			return "N";
		}
	} else if (eval(namegi) == 1) {
		if (eval(num13) != 0) {
			return "N";
		}
	} else {
		if (eval(num13) != (11 - eval(namegi))) {
			return "N";
		}
	}
	return "Y";
};

// 사업자등록번호 체크
UTIL.fnChkWorkNumb = function(obj, strNumb) {
	strNumb = UTIL.fnReplace(strNumb, "-");

	if (strNumb == "")
		return true;

	if (strNumb.length != 10) {
		//alert("사업자등록번호가 잘못되었습니다.");
		MAIN.showDimmPopup(1, '사업자등록번호가 잘못되었습니다.');
		obj.focus();
		return false;
	}

	sumMod = 0;
	sumMod += parseInt(strNumb.substring(0, 1));
	sumMod += parseInt(strNumb.substring(1, 2)) * 3 % 10;
	sumMod += parseInt(strNumb.substring(2, 3)) * 7 % 10;
	sumMod += parseInt(strNumb.substring(3, 4)) * 1 % 10;
	sumMod += parseInt(strNumb.substring(4, 5)) * 3 % 10;
	sumMod += parseInt(strNumb.substring(5, 6)) * 7 % 10;
	sumMod += parseInt(strNumb.substring(6, 7)) * 1 % 10;
	sumMod += parseInt(strNumb.substring(7, 8)) * 3 % 10;
	sumMod += Math.floor(parseInt(strNumb.substring(8, 9)) * 5 / 10);
	sumMod += parseInt(strNumb.substring(8, 9)) * 5 % 10;
	sumMod += parseInt(strNumb.substring(9, 10));

	if (sumMod % 10 != 0) {
		//alert("사업자등록번호가 잘못되었습니다.");
		MAIN.showDimmPopup(1, '사업자등록번호가 잘못되었습니다.');
		obj.focus();
		return false;
	}

	return true;
};

// 내용찾기
UTIL.fnFindInPage = function(str) {
	var txt, i, found;

	if (str == "")
		return false;
	if (document.layers) { // NS4
		if (!fr_disp.find(str))
			while (fr_disp.find(str, false, true))
				n++;
		else
			n++;

		if (n == 0)
			//alert("해당내용이 없습니다.");
			MAIN.showDimmPopup(1, '해당내용이 없습니다.');
	}
	found = "";
	if (document.all) { // IE4
		txt = fr_disp.document.body.createTextRange();
		for (i = 0; i <= n && (found = txt.findText(str)) != false; i++) {
			txt.moveStart("character", 1);
			txt.moveEnd("textedit");
		}
		if (found) {
			txt.moveStart("character", -1);
			txt.findText(str);
			txt.select();
			txt.scrollIntoView();
			n++;
		} else {
			if (n > 0) {
				n = 0;
				UTIL.fnFindInPage(str);
			} else
				//alert("해당내용이 없습니다.");
				MAIN.showDimmPopup(1, '해당내용이 없습니다.');
		}
	}

	return false;
};

// 셀렉트 옵션 제거
UTIL.fnClear_select = function(select_name) {
	sel_len = select_name.length;

	for ( var i = 0; i < sel_len; i++) {
		select_name.options[0] = null;
	}

	return;
};

// 셀렉트 카피
UTIL.fnCopy_select = function(src, desc) {
	UTIL.fnClear_select(desc);

	if (src != 0) {
		cnt = src.length;
		for ( var i = 0; i < cnt; i++) {
			opt = new Option(src.options[i].text, src.options[i].value);
			desc.options[i] = opt;
		}
	}
};

//
UTIL.fnGetOriginStr = function(str, decPt) {
	var strOrigin = "";
	var cnt = 0;
	var decCnt = -1;

	for ( var i = 0; i < str.length; i++) {
		if ((str.charAt(i) >= "0" && str.charAt(i) <= "9")) {
			if (decCnt > -1) {
				if (++decCnt <= decPt) {
					strOrigin += str.charAt(i);
					cnt++;
				} else {
					return strOrigin;
				}
			} else {
				strOrigin += str.charAt(i);
				cnt++;
			}
		} else if (str.charAt(i) == ".") {
			if (decCnt == -1) {
				strOrigin += str.charAt(i);
				decCnt++;
			}
		} else if (i == 0 && str.charAt(i) == "-") {
			strOrigin += str.charAt(i);
		}
	}

	return strOrigin;
};

UTIL.fnMakeMoney = function(str) {

	// 금액 문자열에 포함된 콤마 제거
	if( typeof(str) == 'string' ) {
		str = str.replace(/,/g, '');
	}
	
	str = str + '';
	if (str == undefined || $.trim(str) == "" || isNaN(Number(str)) == true) {
		return 0;
	}
	

	var tempMinus = '';

	if ('-' == str.charAt(0)) {
		tempMinus = str.charAt(0);
		str = str.substr(1);
	}

	var i = 0, j = 0, cnt = str.indexOf(".");
	var strFormed = "";

	if (cnt == -1)
		cnt = str.length;

	for (i = 0; i < cnt % 3; i++) {
		strFormed += str.charAt(i);
	}

	if (cnt / 3 > 1 && cnt % 3 != 0) {
		strFormed += ",";
	}

	for (i = cnt % 3; i < cnt; i++, j++) {
		if (j == 3) {
			strFormed += "," + str.charAt(i);
			j = 0;
		} else {
			strFormed += str.charAt(i);
		}
	}

	strFormed += str.substr(cnt, str.length - cnt);

	return tempMinus + strFormed;
};

UTIL.fnMakeMoneyNotDot = function(str) {
	str = UTIL.fnReplace(str, ",");
	var i = 0, j = 0, cnt = str.indexOf(".");
	var strFormed = "";

	if (cnt == -1)
		cnt = str.length;

	for (i = 0; i < cnt % 3; i++) {
		strFormed += str.charAt(i);
	}

	if (cnt / 3 > 1 && cnt % 3 != 0) {
		strFormed += ",";
	}

	for (i = cnt % 3; i < cnt; i++, j++) {
		if (j == 3) {
			strFormed += "," + str.charAt(i);
			j = 0;
		} else {
			strFormed += str.charAt(i);
		}
	}

	// strFormed += str.substr(cnt, str.length - cnt);

	return strFormed;
};

UTIL.fnMakeMoneyInteger = function(str) {
	str = UTIL.fnReplace(str, ",");
	var i = 0, j = 0, cnt = str.indexOf(".");
	var strFormed = "";

	if (cnt == -1)
		cnt = str.length;

	// for (i = 0; i < cnt % 3; i++) {
	// strFormed += str.charAt(i);
	// }
	strFormed = str.substring(0, cnt);
	return strFormed;
};

UTIL.fnMakeMoneyAstar = function(str) {
	var i = 0, j = 0,

	cnt = str.indexOf(".");
	var strFormed = "";

	if (cnt == -1)
		cnt = str.length;

	for (i = 0; i < cnt % 3; i++) {
		strFormed += '*';
	}

	if (cnt / 3 > 1 && cnt % 3 != 0) {
		strFormed += ",";
	}

	for (i = cnt % 3; i < cnt; i++, j++) {
		if (j == 3) {
			strFormed += "," + '*';
			j = 0;
		} else {
			strFormed += '*';
		}
	}

	strFormed += str.substr(cnt, str.length - cnt);

	return strFormed;
};

UTIL.fnSetMoneyForm = function(edit, decPt) {
	if (edit.value == "") {
		edit.value = "0";
	}
	;

	var strOrigin = GetOriginStr(edit.value, decPt);
	edit.value = MakeMoney(strOrigin);
};

// ///////////////////////////////////////////////////
// 이미지 미리보기
// ///////////////////////////////////////////////////
UTIL.fnSetPicture = function(vForm) { // vForm : 폼명
	pic1 = new Image();
	pic1.src = vForm.photofile_path.value;

	if (pic1.src != "") {
		vForm.imgW.value = "";
		vForm.imgH.value = "";

		// 파일 확장자검사......................
		var rtn = "";
		var i = pic1.src.length;
		while (i > 0) {
			if (pic1.src.charAt(i) == ".")
				break;
			rtn = pic1.src.charAt(i) + rtn;

			i--;
		}
		// .....................................
		if (rtn == "jpg") {
			vForm.previewImg.src = pic1.src;

			vForm.imgW.value = pic1.width;
			vForm.imgH.value = pic1.height;
		} else {
			vForm.imgW.value = "0";
			vForm.imgH.value = "0";
			vForm.imgfile.value = "";
			//alert("업로드될 이미지파일의 확장자가 다릅니다. \n\n이미지파일 확장자를 \"파일명.jpg\" 로 변경하여 주십시요.");
			MAIN.showDimmPopup(1, '업로드될 이미지파일의 확장자가 다릅니다. \n\n이미지파일 확장자를 \"파일명.jpg\" 로 변경하여 주십시요.');
		}
	}
};

// ///////////////////////////////////////////////////
// 한글 금액(천단위)
// ///////////////////////////////////////////////////
UTIL.fnNum2won = function(val) {
	var num = "";
	var strfir = "";
	var won = new Array();

	re = /^[1-9][0-9]*$/;

	// 첫번째가 "-"이면 "-" 문자를 리턴시 합쳐서 보낸다.
	if (val.charAt(0) == "-") {
		strfir = "-";
		val = val.substring(1, val.length);
	} else {
		strfir = "";
	}
	var vOrgNum = UTIL.fnFilterNum(val) * 1000;
	num = vOrgNum.toString().split(",").join("");

	var price_unit0 = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
	var price_unit1 = new Array("", "십", "백", "천");
	var price_unit2 = new Array("", "만", "억", "조", "경", "해", "시", "양", "구", "간", "정");

	for ( var i = num.length - 1; i >= 0; i--) {
		won[i] = price_unit0[num.substr(num.length - 1 - i, 1)];
		if (i > 0 && won[i] != "") {
			won[i] += price_unit1[i % 4];
		}
		if (i % 4 == 0) {
			won[i] += price_unit2[(i / 4)];
		}
	}

	for ( var i = num.length - 1; i >= 0; i--) {
		if (won[i].length == 2) {
			won[i - i % 4] += "-";
		}
		if (won[i].length == 1 && i > 0) {
			won[i] = "";
		}
		// if( i%4 != 0 ) { won[i] = won[i].replace("일", ""); }
	}

	won = won.reverse().join("").replace(/-+/g, "");

	if (won == '') {
		return "";
	} else {
		return "[" + strfir + won + "]원";
	}
};

// ///////////////////////////////////////////////////
// 한글 금액(원단위)
// ///////////////////////////////////////////////////
UTIL.fnNum2won_2 = function(val) {
	var num = "";
	var strfir = "";
	var won = new Array();

	re = /^[1-9][0-9]*$/;

	// 첫번째가 "-"이면 "-" 문자를 리턴시 합쳐서 보낸다.
	if (val.charAt(0) == "-") {
		strfir = "-";
		val = val.substring(1, val.length);
	} else {
		strfir = "";
	}
	var vOrgNum = UTIL.fnFilterNum(val);
	num = vOrgNum.toString().split(",").join("");

	var price_unit0 = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
	var price_unit1 = new Array("", "십", "백", "천");
	var price_unit2 = new Array("", "만", "억", "조", "경", "해", "시", "양", "구",
			"간", "정");

	for ( var i = num.length - 1; i >= 0; i--) {
		won[i] = price_unit0[num.substr(num.length - 1 - i, 1)];
		if (i > 0 && won[i] != "") {
			won[i] += price_unit1[i % 4];
		}
		if (i % 4 == 0) {
			won[i] += price_unit2[(i / 4)];
		}
	}

	for ( var i = num.length - 1; i >= 0; i--) {
		if (won[i].length == 2) {
			won[i - i % 4] += "-";
		}
		if (won[i].length == 1 && i > 0) {
			won[i] = "";
		}
		// if( i%4 != 0 ) { won[i] = won[i].replace("일", ""); }
	}

	won = won.reverse().join("").replace(/-+/g, "");

	if (won == '') {
		return "";
	} else {
		return "[" + strfir + won + "]원";
	}
};

// 에러메시지
UTIL.fnErrorMsg = function(errorNum) {
	switch (errorNum) {
	case 1:
		//alert("입력을잘못하셨습니다.");
		MAIN.showDimmPopup(1, '입력을 잘못하셨습니다');
		frm.num.value = "";
		break;
	}
};

// ///////////////////////////////////////////////////
// 숫자형 자료에 포멧 적용(#,-) 만 사용 : 주민등록번호, 사업자등록번호 등에 사용
// ///////////////////////////////////////////////////
UTIL.fnRegNoFormat = function(sFormat) {
	var ob = event.srcElement;
	var sText = UTIL.fnReplace(ob.value, "-");
	if (sText.length == 0) {
		ob.value = "";
		return false;
	}
	ob.value = "";
	spnumber = sFormat.split('-');
	for ( var i = 0; i < spnumber.length; i++) {
		if (spnumber[i].length > 0) {
			ob.value = ob.value + sText.substring(0, spnumber[i].length);
			sText = sText.substring(spnumber[i].length, sText.length);
		}
		ob.value = ob.value + "-";
	}

	ob.value = ob.value.substring(0, ob.value.length - 1);
	return true;
};

// ///////////////////////////////////////////////////
// 숫자형 자료에 포멧 적용(#,-) 만 사용 : 주민등록번호, 사업자등록번호 등에 사용
// String형으로 Return
// ///////////////////////////////////////////////////
UTIL.fnFormatString = function(arg1, arg2) {
	var ob = "";
	var sText = arg1.split("-").join("");
	if (sText.length == 0) {
		return "";
	}

	spnumber = arg2.split('-');
	for ( var i = 0; i < spnumber.length; i++) {
		if (spnumber[i].length > 0) {
			ob = ob + sText.substring(0, spnumber[i].length);
			sText = sText.substring(spnumber[i].length, sText.length);
		}
		ob = ob + "-";
	}

	ob = ob.substring(0, ob.length - 1);

	return ob;
};

// ///////////////////////////////////////////////////
// 입력하는 문자 길이에 따라 Focus 이동하기(길이, this, 다음텍스트박스의이름)
// ///////////////////////////////////////////////////
UTIL.fnChgFocus = function(len, inObj, nextObj) {
	if (inObj.value.length == len) {
		nextObj.focus();
	}
};

// ///////////////////////////////////////////////////
// 재산등록시 숫자 및 - 입력 가능
// ///////////////////////////////////////////////////
UTIL.fnFCheckNumber = function() {
	var objEv = event.srcElement;
	var numPattern = /([^0-9,-])/;
	numPattern = objEv.value.match(numPattern);
	if (numPattern != null) {
		objEv.value = "";
		objEv.focus();
		return false;
	} else {
		return true;
	}
};

// ///////////////////////////////////////////////////
// 재산등록시 comma 추가
// ///////////////////////////////////////////////////
UTIL.fnFCommaInsert = function(obj) {
	var re = /(-?\d+)(\d{3})/;
	var num = obj.value;
	while (re.test(num)) {
		num = num.replace(re, "$1,$2");
	}

	obj.value = num;
};

// 글자수 체크 함수
// ==========================================================================================
UTIL.fnF_chkMaxLen = function(maxLen, frmForm, printNum) {
	var tmpStr;

	tmpStr = frmForm.value;

	UTIL.fnCheckMsg(tmpStr, maxLen, frmForm, printNum);
};

UTIL.fnCheckMsg = function(msg, maxLen, frmForm, printNum) {
	var tmpStr;
	var temp = 0;
	var onechar;
	var tcount;

	tcount = 0;

	tmpStr = UTIL.fnReplaceSpecial(new String(msg));
	temp = tmpStr.length;

	for ( var k = 0; k < temp; k++) {
		onechar = tmpStr.charAt(k);

		if (escape(onechar) == '%0D') {
			tcount++;
		} else if (escape(onechar).length > 4) {
			tcount += 2;
		} else {
			tcount++;
		}
	}

	// 만약 printNum이 '0'일 경우 현재 글자수를 보이지 않게한다.
	if (printNum != "0") {
		var priNum = eval(printNum);

		priNum.innerHTML = tcount + "/" + maxLen;
	}

	if (tcount > parseInt(maxLen)) {
		reserve = tcount - parseInt(maxLen);
//		alert("입력하신 내용은 " + maxLen + "bytes 까지 입니다..\r\n입력된 내용은 " + reserve
//				+ "바이트가 초과되었습니다.\r\n초과된 부분은 자동으로 삭제됩니다.");
		MAIN.showDimmPopup(1, "입력하신 내용은 " + maxLen + "bytes 까지 입니다..\r\n입력된 내용은 " + reserve
				+ "바이트가 초과되었습니다.\r\n초과된 부분은 자동으로 삭제됩니다.");
		cutText(maxLen, frmForm, printNum);

		return false;
	}

	return true;
};

UTIL.fnCutText = function(maxLen, frmForm, printNum) {
	byte_check(frmForm.value, maxLen, frmForm, printNum);
};

UTIL.fnByte_check = function(tmp, maxLen, frmForm, printNum) {
	var tmpStr;
	var temp = 0;
	var onechar;
	var tcount;

	tcount = 0;

	tmpStr = new String(tmp);
	temp = tmpStr.length;

	for ( var k = 0; k < temp; k++) {
		onechar = tmpStr.charAt(k);
		if (escape(onechar).length > 4) {
			tcount += 2;
		} else {
			tcount++;
		}

		if (tcount > parseInt(maxLen)) {
			tmpStr = tmpStr.substring(0, k);
			break;
		}
	}

	frmForm.value = tmpStr;
	UTIL.fnCheckMsg(tmpStr, maxLen, frmForm, printNum);
};

UTIL.fnReplaceSpecial = function(str) {
	re = /\t/gi;
	re = /\n/gi;
	re = /\r/gi;
	re = /\n\r/gi;

	return str;
};

/**
 * 입력된 object(JSON)를 Query String형태로 변환한다.
 * 
 * @param 	obj 	object
 * @return 	str 	string
 */
UTIL.fnJSONToQueryString = function(obj) {

	var str = '';
	if( obj == null ) return str;
	
	$.each(obj, function(k, v) {

		if (typeof v == 'object') {
			if( Array.isArray(v) == true ){
				v = UTIL.fnArrayToQueryString(v);
				str += v;
			}
			else{
				v = JSON.stringify(v);
				str += k + '=' + encodeURIComponent(v) + '&';
			}
		}
		else{
			str += k + '=' + encodeURIComponent(v) + '&';
		}
	});
	
//	return UTIL.fnRemoveRight(str, 1).replace(/"/g, '\'');
	return str.replace(/"/g, '\'');
};

/**
 * 입력된 배열을 Query String형태로 변환한다. 
 * @param 	arr 	array
 * @return 	qs		string
 */
UTIL.fnArrayToQueryString = function(arr) {
	var qs = '';
	var rtnQS = '';
	if( Array.isArray(arr) == true ){
		for( var i=0; i<arr.length; i++ ){
			//수정 20170203 노영철
			//qs += decodeURIComponent( $.param(arr[i]) ) + '&';
			//수정 20170215 양성하
			var item = arr[i];
			qs += UTIL.fnJSONToQueryString(item) + '&';
			qs = qs.replace(/\&\&/g, "&");
		}
//		console.log(qs)
//		var temp = qs.split('&');
//		for(var j=0;j<temp.length-1;j++){
//			var _temp = temp[j].split('=');
//			if(_temp[1]) rtnQS += _temp[0]+'='+encodeURIComponent(_temp[1].replace(/\+/g, ' '))+'&';
//		}
	}
//	return rtnQS;
	return qs;
};

UTIL.fnQueryStringToJSON = function(str) {
	var obj = {};
	var arr = str.split("&");
	for( var i=0; i<arr.length; i++ ){
		var key = arr[i].split("=")[0];
		var val = arr[i].split("=")[1];
		if( key == "" ){
			continue;
		}
		
		if( obj[key] == undefined ){
			obj[key] = val;
		}
		else {
			if( Array.isArray( obj[key] ) == true ){
				obj[key].push( val );
			}
			/*else if( typeof obj[key] == "object" ){
				obj[key]
			}*/
			else{
				var tempArr = [];
				tempArr.push( obj[key] );
				tempArr.push( val );
				obj[key] = tempArr;
			}
		}
	}
	//console.log("UTIL.fnQueryStringToJSON() obj == ")
	//console.log(obj);
	return obj;
}

// ==============================================================================
// 함수명 : gfn_GetLastDay
// 내용 설명 : 해당 년월의 마지막 일자를 가져온다.
// Param 값 : string(ex : 200902)
// return 값 : last_day
// ==============================================================================
UTIL.fnGetLastDay = function(str_yyyymm) {

	var int_year, int_month;
	var len;
	var yy, mm, last_day, dd;
	var c;

	// int_year = ToInteger(substr(str_yyyymm, 0, 4));
	// int_month = ToInteger(substr(str_yyyymm, 4, 2));

	int_year = Number(str_yyyymm.substring(0, 4));
	int_month = Number(str_yyyymm.substring(4, 6));

	if (int_month < 1 || int_month > 12) {
		return -1;
	}
	if (int_month == 2) {
		if ((int_year % 4) == 0 && (int_year % 100) != 0
				|| (int_year % 400) == 0) {
			last_day = 29;
		} else {
			last_day = 28;
		}
	} else if (int_month == 4 || int_month == 6 || int_month == 9
			|| int_month == 11) {
		last_day = 30;
	} else {
		last_day = 31;
	}

	return last_day;
};

/**
 * 주민번호에 "-" 넣기 예) 1234561234567 --> 123456-1234567
 * 
 * @param {Object}
 *            obj
 * @return {String} str
 */
UTIL.fnJuminNoFormat = function(str) {

	if (str == "" || str == "null" || str.length < 13) {
		return str;
	}
	str = str.substr(0, 6) + "-" + str.substr(6, 13);

	return str;
};

/**
 * 전화번호에 "-" 넣기 예) 01011112222 --> 010-1111-2222
 * 
 * @param {String}
 *            tel_no
 * @return {String} str
 */
UTIL.fnTelNoDash = function(tel_no) {
	var strTemp = "****";
	if (this.fnIsDigit(tel_no) == false) { // 전화번호에 - 가있다면

		var arrTemp = tel_no.split("-");

		if (tel_no.length == 0) {
			return ("");
		} else {
			if (arrTemp.length == 1) {
				return (this.fnSubStrLeft(tel_no, tel_no.length - 4) + strTemp);
			} else if (arrTemp.length == 2) {
				return (arrTemp[0] + "-" + arrTemp[1] + "-" + this
						.fnSubStrRight(tel_no, 4));
			} else {
				return (arrTemp[0] + "-" + arrTemp[1] + "-" + arrTemp[2]);
			}
		}

	} else {
		if (tel_no.substr(0, 2) == "01") {
			if (tel_no.length == 10) {
				return this.fnSubStrLeft(tel_no, 3) + '-'
						+ tel_no.substring(3, 6) + '-'
						+ this.fnSubStrRight(tel_no, 4);
			} else {
				return this.fnSubStrLeft(tel_no, 3) + '-'
						+ tel_no.substring(3, 7) + '-'
						+ this.fnSubStrRight(tel_no, 4);

			}
		}
		if (tel_no.substr(0, 2) == "02") {
			if (tel_no.length == 9) {
				return this.fnSubStrLeft(tel_no, 2) + '-'
						+ tel_no.substring(2, 5) + '-'
						+ this.fnSubStrRight(tel_no, 4);
			} else {
				return this.fnSubStrLeft(tel_no, 2) + '-'
						+ tel_no.substring(2, 6) + '-'
						+ this.fnSubStrRight(tel_no, 4);

			}
		} else if (tel_no.substr(0, 2) == "03" || tel_no.substr(0, 2) == "04"
				|| tel_no.substr(0, 2) == "05" || tel_no.substr(0, 2) == "06") {

			return this.fnSubStrLeft(tel_no, 3) + '-' + tel_no.substring(3, 6)
					+ '-' + this.fnSubStrRight(tel_no, 4);
		}

	}
};
// ============================================================================
// 메소드 명 : fn_setSecurityTable()
// 내용 설명 : 현재 폼에 보안을 적용시키고 .(TABLE,LABEL 만 가능)
// 각 컴포넌트(TD) 의 ID값에 REL 속성을
// REGNO(주민번호)REGNO_CLK(clickevent추가),CSNM(고객명)CSNM_CLK(clickevent추가),PREM(보험료)PREM_CLK(clickevent추가)를
// 적용한
// 전 대상을 보안처리 한다.
// 주의 : 해당 화면의 모든 값을 변경함으로 rel속성 지정에 유의해야된다.(ex) fcGAInsInfoMain.js (20120619
// 기준)
// RETURN 값 : 없음
// ============================================================================
UTIL.fn_setSecurityTable = function() {
	var targetRegNos = $('[rel~=REGNO]');
	var targetCsNms = $('[rel~=CSNM]');
	var targetPrem = $('[rel~=PREM]');
	var targetRegNos_clickEvent = $('[rel~=REGNO_CLK]');
	var targetCsNms_clickEvent = $('[rel~=CSNM_CLK]');
	var targetPrem_clickEvent = $('[rel~=PREM_CLK]');

	var target = false;

	// 주민번호 보안적용
	$.each(targetRegNos, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			// text 변경
			target.text(UTIL.fnRegMask(target.text()));
		}
	});

	// 주민번호 보안적용 + clickEvent
	$.each(targetRegNos_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			$('#' + target.attr('id')).attr(
					'onclick',
					'UTIL.fn_setAtar("' + target.attr('id') + '","'
							+ target.text() + '","REGNO") ');
			// text 변경
			target.text(UTIL.fnRegMask(target.text()));
		}
	});

	// 고객명보안적용
	$.each(targetCsNms, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnNameMask(target.text()));
		}
	});
	// 고객명보안적용 + clickEvent
	$.each(targetCsNms_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			$('#' + target.attr('id')).attr(
					'onclick',
					'UTIL.fn_setAtar("' + target.attr('id') + '","'
							+ target.text() + '","CSNM") ');
			target.text(UTIL.fnNameMask(target.text()));
		}
	});

	// 보험료보안적용
	$.each(targetPrem, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnMoneyMaskAll(target.text()));
		}
	});
	// 보험료보안적용 + clickEvent
	$.each(targetPrem_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			$('#' + target.attr('id')).attr(
					'onclick',
					'UTIL.fn_setAtar("' + target.attr('id') + '","'
							+ target.text() + '","PREM") ');
			target.text(UTIL.fnMoneyMaskAll(target.text()));
		}
	});
};

UTIL.fn_setSecurityTableNotEvent = function() {

	var targetRegNos = $('[rel~=REGNO]');
	var targetCsNms = $('[rel~=CSNM]');
	var targetPrem = $('[rel~=PREM]');
	var targetRegNos_clickEvent = $('[rel~=REGNO_CLK]');
	var targetCsNms_clickEvent = $('[rel~=CSNM_CLK]');
	var targetPrem_clickEvent = $('[rel~=PREM_CLK]');

	var target = false;

	// 주민번호 보안적용
	$.each(targetRegNos, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			// text 변경
			target.text(UTIL.fnRegMask(target.text()));
		}
	});

	// 주민번호 보안적용 + clickEvent
	$.each(targetRegNos_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnRegMask(target.text()));
		}
	});

	// 고객명보안적용
	$.each(targetCsNms, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnNameMask(target.text()));
		}
	});
	// 고객명보안적용 + clickEvent
	$.each(targetCsNms_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnNameMask(target.text()));
		}
	});

	// 보험료보안적용
	$.each(targetPrem, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnMoneyMaskAll(target.text()));
		}
	});

	// 보험료보안적용 + clickEvent
	$.each(targetPrem_clickEvent, function() {
		target = $(this);
		if (UTIL.fnStrCount(target.text(), "*") <= 0) {
			target.text(UTIL.fnMoneyMaskAll(target.text()));
		}
	});
};

// ============================================================================
// 메소드 명 : fn_setAtar(tdIDm 변환대상Str, 구분){
// 내용 설명 : 현재 폼에 보안을 적용시킨다.(TABLE,LABEL 만 가능)//
// RETURN 값 : 없음
// ============================================================================
UTIL.fn_setAtar = function(viewId, strData, sCat) {
	var SECOND = 5;

	// 클릭시 모든 컬럼을 비활성화 처리
	UTIL.fn_setSecurityTableNotEvent();

	// 주민등록번호
	if (sCat == "REGNO") {
		if (UTIL.fnStrCount($('#' + viewId).text(), "*") > 0) {
			$('#' + viewId)
					.text(UTIL.fnFormatString(strData, "######-#######"));
			setTimeout('$("#' + viewId + '").text("' + UTIL.fnRegMask(strData)
					+ '")', 1000 * SECOND);
		}
	}
	// 고객성명
	if (sCat == "CSNM") {
		if (UTIL.fnStrCount($('#' + viewId).text(), "*") > 0) {
			$('#' + viewId).text(strData);
			setTimeout('$("#' + viewId + '").text("' + UTIL.fnNameMask(strData)
					+ '")', 1000 * SECOND);
		}
	}
	// 주민등록번호
	if (sCat == "PREM") {
		if (UTIL.fnStrCount($('#' + viewId).text(), "*") > 0) {
			$('#' + viewId).text(UTIL.fnMakeMoneyNotDot(strData));
			setTimeout('$("#' + viewId + '").text("'
					+ UTIL.fnMoneyMaskAll(strData) + '")', 1000 * SECOND);
		}
	}
};

/**
 * 날짜 변화 : 1~9일에 -> 01,02,03,04... 앞에 "0"을 붙인다.
 * 
 * @param customers
 *            고객정보 목록
 */
UTIL.fn_addZero = function(num) {

	if (num == undefined || num == "")
		return "";

	if (num <= 9)
		num = "0" + num;

	return num;
};

/**
 * undefined일 때 ""를 리턴한다.
 * 
 * @param
 */
UTIL.fn_undefInit = function(str) {

	if (str == undefined || str == null || str == "null")
		return "";

	return str;
};


/**
 * 비교대상 문자열을 체크할 길이와 비교하여 작을 경우 작은 만큼 삽입 문자열을 추가한다. 
 * 삽입 문자열 위치값으로 앞이나 뒤에다가 붙일 수 있다.
 * 주의 : 벨리데이션 체크 생략함 정확하게 입력할 것
 * @author 정헌태
 * @since 2012.09.26
 * 
 * @param strOrgString	String - 비교대상인 문자열
 * @param strSetString	String - 삽입 문자열
 * @param nLength	int - 체크할 길이
 * @param nPosition	int - 삽입 문자열이 삽입될 위치(0:앞,1:뒤)
 * @returns String	변환된 문자열
 */
UTIL.fnCheckSetString = function(strOrgString, strSetString, nLength, nPosition) {
	
	if (strOrgString == null || strOrgString == undefined) {
		strOrgString = "";
	}
	
	strOrgString = strOrgString + "";
	
	if (strOrgString.length < nLength) {
		var nCheckCount = nLength - strOrgString.length;
		
		for (var i = 0; i < nCheckCount; i++) {
			if (nPosition == 0) {
				strOrgString = strSetString + strOrgString;
			} else {
				strOrgString = strOrgString + strSetString;
			}
		}
		
		return strOrgString
	} else {
		return strOrgString;
	}
};

/** ***************************************************************************
 * 
 *  세션스토리지 컨트롤 함수
 * 
 * ****************************************************************************/



//세션스토리지저장하기
//UTIL.fnSaveStorage('key', value);
UTIL.fnSaveStorage = function(key, value) {
	if(undefined == key || '' == key || undefined == value || '' == value){
		return;
	}
	if(typeof value === 'object'){
		value = JSON.stringify(value);
	}
	key = "kyobo_mobile_" + key;
	sessionStorage.setItem(key, value);
};



//세션스토리지불러오기
//UTIL.fnLoadStorage('key');
UTIL.fnLoadStorage = function(key, dataType) {
	if(!UTIL.fnCheckStorage(key)){
		return '';
	}
	key = "kyobo_mobile_" + key;
	var value = sessionStorage.getItem(key);
	
	switch(dataType){
	case 'object' 	: value = JSON.parse(value); 	break;
	case 'number' 	: value = Number(value); 		break;
	default			:								;	
	}

	return value;
};



//세션스토리지지우기
//UTIL.fnRemoveStorage('key');
UTIL.fnRemoveStorage = function(key) {
	//키값 없을시 전부삭제 (페이지 저장 내용만)
	if(undefined == key){
		var storageLen = sessionStorage.length;
		var removeItemArray = new Array();;
		
		for(var i=0;i<storageLen;i++){
			var loopKey = sessionStorage.key(i);
			if(loopKey.indexOf("kyobo_mobile_") != -1){
				removeItemArray[removeItemArray.length] = loopKey;
			}
		}
		var removeItemLen = removeItemArray.length;
		for(var i=0;i<removeItemLen;i++){
			sessionStorage.removeItem(removeItemArray[i]);
		}
	}
	else{
		key = "kyobo_mobile_" + key;
		sessionStorage.removeItem(key);
	}
};



//세션스토리지값있는지체크
//UTIL.fnCheckStorage('key');
UTIL.fnCheckStorage = function(key) {
	key = "kyobo_mobile_" + key;
	if(!sessionStorage.getItem(key)){
		return false;
	}
	return true;
};

/**
 * query string 을 json 객체로 변환
 * query string을 JQuery.ajax의 POST로 전달시 한글이 깨지는 것 방지
 * 
 */
UTIL.qsToObject = function(qs) {
	 var o = {};
	    qs.replace(
	        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
	        function ($0, $1, $2, $3) { o[$1] = $3; }
	        );
	    return o;
};

/**
 * 입력된 숫자형 문자열의 앞자리가 '0'인지 체크하여 삭제후 리턴한다.
 */
UTIL.setNotZero = function(strData){
	// 숫자형 문자열인지 체크
	if (strData == ""){
		return strData;
	} else if (UTIL.fnIsInteger(strData) != true) {
		//alert("UTIL.setNotZero : 입력된 data가 숫자형 문자열이 아닙니다.");
		MAIN.showDimmPopup(1, 'UTIL.setNotZero : 입력된 data가 숫자형 문자열이 아닙니다.');
		return strData;
	}
	
	strData = strData + "";
	var result = "";
	
	for (i = 0; i < strData.length; i++) {
		if (strData.substr(i, 1) != "0"){
			result = strData.substring(i, strData.length);
			break;
		}
	}
	
	return result;
};


/**
 * 입력된 data가 null, undefined 인지 체크
 * key 값에 따른 리턴
 * 
 * @param	data	???	체크할 data
 * @param	strReKey	string	str: 문자열반환,n: 숫자형반환, b: boolean반환, 빈스트링/null/undefined: boolean반환
 * @return	정상일 경우 - str: 입력된 data, n: 입력된 data, b: true, 빈스트링/null/undefined: true	
 * 			비정상일 경우 - str: 빈문자열, n: 0, b: false, 빈스트링/null/undefined: false
 */
UTIL.checkNotBin = function(data, strReKey) {
	var bCheck = true;
	
	// 입력된 data가 비정상 값인지 판단
	if (data == null){
		bCheck = false;
	} else if (data == undefined){
		bCheck = false;
	}
	
	// 비정상 값일경우 리턴키에 따른 리턴
	if (bCheck == false){
		switch(strReKey){
		case "str" : return ""; // string은 빈문자열 반환
			break;
		case "n" : return 0;	// int는 0 반환
			break;
		case "b" : return false;	// boolean은 false 반환
			break;
		case "" : return false; // 빈문자열은 false 반환
			break;
		case undefined : return false; // undefined는 false 반환
			break;
		case null : return false; // null은 false 반환
		break;
		}
	} else { //정상일경우 strReKey 값을 입력하지 않거나 Boolean으로 선택한경우는 true 반환
		if (strReKey == null || strReKey == undefined || strReKey == "" || strReKey == "b" ){
			return true;
		} else {	// 기타의 경우 입력된 값 그대로 반환
			return data;
		}
	}
	
	return true;
};

// 마스크 처리 type에 따라 2, 3등분하여 원하는 부분을 * 기호로 처리함
UTIL.fnMakeMast = function(str, type){
	if(undefined==str||""==str||"string" != typeof str){
		return "";
	}
	strLen = str.length;
	halfLen = strLen / 2;
	div1Len = strLen / 3;
	div2Len = (strLen*2) / 3;
	
	var half1st = str.substr(0,halfLen);
	var half2nd = str.substr(halfLen, strLen);
	var div1st	= str.substr(0,div1Len);
	var div2nd	= str.substr(div1Len,div2Len);
	var div3rd	= str.substr(div2Len,strLen);
	if(type == "1"){
		return half1st + UTIL.fnMakeAst(halfLen);
	}else if(type == "2"){
		return div1st + UTIL.fnMakeAst(div1Len) + div3rd;
	}else{
		return half1st + UTIL.fnMakeAst(halfLen);
	}
};
// * 기호를 입력숫자만큼 만들어서 문자열로 반환
UTIL.fnMakeAst = function(cnt){
	var star = "";
	for(var i=0; i<cnt; i++){
		star += "*";
	}
	return star;
};

UTIL.getContextPath = function(){	
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
};


UTIL.getSourcePath = function(src) {
	var gsSrcPath = "";
	var scripts = document.getElementsByTagName("script");
	for (var i=0; i < scripts.length; i++) {
		if (scripts[i].src.match(src)) {
			gsSrcPath = scripts[i].src.replace(src, "");
			break;
		}
	}
	scripts = null;
	return gsSrcPath;
};

UTIL.resetUI = function(obj){
	// $(document).on('touchmove',function(e){
	// 	e.preventDefault();
	// }) ios 스크롤 바운스 해제 방법. 필요한 경우 호출한다. 그냥 쓰면 전체 스크롤이 안먹으니 조심....
	
	//인풋영역 숫자 디폴트 처리 common.js
	setInputNum();
	
	//obj.acc.firstShow : true (첫 번째 어코디언 펼침)
	obj = (obj===undefined)?{}:obj;
	//어코디언 접기펴기 초기화
	$('.acc-wrap .acc').each(function(i){
		$(this).removeClass('show');
		
		if(obj.acc!==undefined && obj.acc.firstShow===true){
			if(obj.acc.showIdx != undefined){
				if(i === obj.acc.showIdx){
					$(this).addClass('show');
					
					if($(this).find('.click-target2').length > 0){
						$($(this).find('.click-target2')[i]).hide();
						$($(this).find('.click-target')[i]).show();
					}
				}
			}else{
				if(i===0){
					$(this).addClass('show');
					if($(this).find('.click-target2').length > 0){
						$($(this).find('.click-target2')[0]).show();
						$($(this).find('.click-target')[0]).hide();
					}
				}
			}
		}
/*		var $target = $(this).find('.click-target');
		$target.off('click').on('click',function(){
			$(this).parents('.acc').toggleClass('show');
			if($(this).parents('.acc').hasClass('show')){
				$(this).find('.acc-state ').text('접기');
			}else{
				$(this).find('.acc-state ').text('펼쳐보기');
			}
			return false;
		});
*/	});
	
	$('.acc-wrap').toggle();
//	$('.tab-submenu').showTab();
	

	
	
	//positionTop(); //맨위로 이동 -> load.jsp에서 호출
	//fixedBtn();
	$('nav').headFixed();
	$('.p-name-wrap').currentMenu();

	//$('.open-dimm-layer').dimmLayer();
	$('.tab-submenu').tabMove();
};


//맨위로 이동 top버튼
UTIL.positionTop = function(){
	CommonUI.positionTop();
}

UTIL.interval = null;
UTIL.startTimer = function(maxSeconds, id, callback){
	UTIL.stopTimer();
	
	var timer = maxSeconds;
	var minutes = parseInt(timer/60, 10);
	var seconds = parseInt(timer%60, 10);

	//minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	$(id).text(minutes+":"+seconds);

	UTIL.interval = setInterval(function(){
		timer--;
		minutes = parseInt(timer/60, 10);
		seconds = parseInt(timer%60, 10);
		
		//minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		$(id).text(minutes+":"+seconds);
		
		if( timer <= 0 ){
			timer = 0;
			clearInterval(UTIL.interval);
			if( typeof callback == 'function' ){
				callback();
			}
		}
	}, 1000);
}

UTIL.stopTimer = function(){
	if( UTIL.interval != null ){
		clearInterval(UTIL.interval);
	}
}

UTIL.fnResultEmpty = function(rst){
	if(rst === undefined || rst === ""){
		return "-";
	}
	
	rst = rst.replace(/^\s*/,'').replace(/\s*$/,'');
	
	if(rst === "" || rst === "<br> /" || rst === "()" || rst === "일"  || rst === "원" 
		|| rst === "%" || rst === "(%+%)"){
		return "-";
	}
	
	return rst;
}



UTIL.resetPopupUI = function(obj){
	// $(document).on('touchmove',function(e){
	// 	e.preventDefault();
	// }) ios 스크롤 바운스 해제 방법. 필요한 경우 호출한다. 그냥 쓰면 전체 스크롤이 안먹으니 조심....
	//obj.acc.firstShow : true (첫 번째 어코디언 펼침
	obj = (obj===undefined)?{}:obj;
	//어코디언 접기펴기 초기화
	$('#layerIdx'+CommonUI.nowLayerIdx+ '.acc-wrap .acc').each(function(i){
		$(this).removeClass('show');
		if(i===0){
			if(obj.acc!==undefined&&obj.acc.firstShow===true){
				$(this).addClass('show');
			}
		}
		var $target = $(this).find('.click-target');
		$target.off('click').on('click',function(){
			$(this).parents('.acc').toggleClass('show');
			if($(this).parents('.acc').hasClass('show')){
				$(this).find('.acc-state ').text('접기');
			}else{
				$(this).find('.acc-state ').text('펼쳐보기');
			}
			return false;
		});
	});
	
	//$(function(){
		$('#layerIdx'+CommonUI.nowLayerIdx+ ' .acc-wrap').toggle();
		$('#layerIdx'+CommonUI.nowLayerIdx+ ' .tab-submenu').showTab();
		CommonUI.fixedBtn();
	//});

};

//이메일유효성체크
UTIL.chkEmailForm = function(email) {
	var rexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	if (!rexEmail.test(email)){
		return false;
	} else {
		return true;
	}
}

//============================================================================
// 메소드 명 : fnCurrentDtm(날짜 구분 기호, 날짜 시간 구분 방식)
// 내용 설명 : 현재일시 구하기
// RETURN 값 : 찾은 위치
//============================================================================
UTIL.fnCurrentDtm = function(dv, wrkGb) {
	var dst = "";
	var timeDv = "";

	if (dv == undefined) {
		dv = "-";
	}
	
	if (wrkGb == "1") {
		dst = "T";
		timeDv = ":";
	} else if (wrkGb == "2") {
		dst = " ";
		timeDv = ":";
	}

	var now = new Date();
	var year = now.getFullYear();
	var mon = (now.getMonth() + 1) > 9 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1);
	var day = (now.getDate() > 9 ? "" + now.getDate() : "0" + now.getDate());
	
	var hour = (now.getHours() > 9 ? "" + now.getHours() : "0" + now.getHours());
	var minites = (now.getMinutes() > 9 ? "" + now.getMinutes() : "0" + now.getMinutes());
	var seconds = (now.getSeconds() > 9 ? "" + now.getSeconds() : "0" + now.getSeconds());
	
	return year + dv + mon + dv + day + dst + hour + timeDv + minites + timeDv + seconds
}

//============================================================================
// 메소드 명 : fnSetFormatDtm(원문 String)
// 내용 설명 : 현재일시 구하기
// RETURN 값 : 찾은 위치
//============================================================================
UTIL.fnSetFormatDtm = function(str) {
	var replaceStr = UTIL.fnReplace(str, "-");
	replaceStr = UTIL.fnReplace(str, ".");
	replaceStr = UTIL.fnReplace(str, ":");
	replaceStr = UTIL.fnReplace(str, " ");

	var year = replaceStr.substring(0, 4);
	var month = replaceStr.substring(4, 6);
	var day = replaceStr.substring(6, 8);
	var hour = replaceStr.substring(8, 10);
	var minites = replaceStr.substring(10, 12);
	var seconds = replaceStr.substring(12, 14);

	return year + "-" + month + "-" + day + " " + hour + ":" + minites + ":" + seconds;
}