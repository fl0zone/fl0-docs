---
---

# Static Sites

Follow this guide if you have a frontend site built with HTML/CSS/JS and wish to deploy it on FL0.

### Using Nginx

Adding an `nginx.conf` file to the root of your repo will tell FL0 to build your code as a web server. Copy the two file templates below into your repository, being sure to adjust the `dist` folder on line 21 in case your output folder is different.

```bash {21} title="/nginx.conf" showLineNumbers
worker_processes 1;
daemon off;

error_log stderr;
events { worker_connections 1024; }

http {
  charset utf-8;
  log_format cnb 'NginxLog "$request" $status $body_bytes_sent';
  access_log /dev/stdout cnb;
  default_type application/octet-stream;
  include mime.types;
  sendfile on;

  tcp_nopush on;
  keepalive_timeout 30;
  port_in_redirect off; # Ensure that redirects don't include the internal container PORT - 8080

  server {
    listen {{port}};
    root dist; # Change this to the name of your output folder. E.g. 'public', 'build'
    index index.html index.htm Default.htm;
  }
}
```

```bash title="/mime-types.conf" showLineNumbers
types {
  text/html html htm shtml;
  text/css css;
  text/xml xml;
  image/gif gif;
  image/jpeg jpeg jpg;
  application/x-javascript js;
  application/atom+xml atom;
  application/rss+xml rss;
  font/ttf ttf;
  font/woff woff;
  font/woff2 woff2;
  text/mathml mml;
  text/plain txt;
  text/vnd.sun.j2me.app-descriptor jad;
  text/vnd.wap.wml wml;
  text/x-component htc;
  text/cache-manifest manifest;
  image/png png;
  image/tiff tif tiff;
  image/vnd.wap.wbmp wbmp;
  image/x-icon ico;
  image/x-jng jng;
  image/x-ms-bmp bmp;
  image/svg+xml svg svgz;
  image/webp webp;
  application/java-archive jar war ear;
  application/mac-binhex40 hqx;
  application/msword doc;
  application/pdf pdf;
  application/postscript ps eps ai;
  application/rtf rtf;
  application/vnd.ms-excel xls;
  application/vnd.ms-powerpoint ppt;
  application/vnd.wap.wmlc wmlc;
  application/vnd.google-earth.kml+xml  kml;
  application/vnd.google-earth.kmz kmz;
  application/x-7z-compressed 7z;
  application/x-cocoa cco;
  application/x-java-archive-diff jardiff;
  application/x-java-jnlp-file jnlp;
  application/x-makeself run;
  application/x-perl pl pm;
  application/x-pilot prc pdb;
  application/x-rar-compressed rar;
  application/x-redhat-package-manager  rpm;
  application/x-sea sea;
  application/x-shockwave-flash swf;
  application/x-stuffit sit;
  application/x-tcl tcl tk;
  application/x-x509-ca-cert der pem crt;
  application/x-xpinstall xpi;
  application/xhtml+xml xhtml;
  application/zip zip;
  application/octet-stream bin exe dll;
  application/octet-stream deb;
  application/octet-stream dmg;
  application/octet-stream eot;
  application/octet-stream iso img;
  application/octet-stream msi msp msm;
  application/json json;
  audio/midi mid midi kar;
  audio/mpeg mp3;
  audio/ogg ogg;
  audio/x-m4a m4a;
  audio/x-realaudio ra;
  video/3gpp 3gpp 3gp;
  video/mp4 mp4;
  video/mpeg mpeg mpg;
  video/quicktime mov;
  video/webm webm;
  video/x-flv flv;
  video/x-m4v m4v;
  video/x-mng mng;
  video/x-ms-asf asx asf;
  video/x-ms-wmv wmv;
  video/x-msvideo avi;
}
```
