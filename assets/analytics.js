// 메이커로프트 방문자 집계 (구글 애널리틱스)
// GA_ID 가 비어 있으면 아무것도 하지 않는다. 측정 ID 는 여기 한 곳만 바꾼다.
(function () {
  var GA_ID = '';
  if (!GA_ID) return;

  // 쿠키 동의 창이 없으므로 유럽 쪽 방문자는 쿠키 없이 둔다. 그쪽 성과는 스토어 cid 로 본다.
  var NO_COOKIE = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
    'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'];

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'
  });
  gtag('consent', 'default', { analytics_storage: 'denied', region: NO_COOKIE });
  gtag('js', new Date());
  gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // 판매로 이어지는 두 행동(스토어로 이동, 복구 문의)을 따로 센다
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.href.indexOf('apps.microsoft.com') > -1) gtag('event', 'store_click', { link_url: a.href });
    if (a.href.indexOf('mailto:') === 0) gtag('event', 'service_contact', { link_url: a.href.split('?')[0] });
  });
})();
