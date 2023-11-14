---
sidebar_position: 9
---

# Networking

## Outgoing IP Addresses
If you need FL0 to connect to external services, you might need to know the IP addresses that FL0 uses so you can allowlist them in your firewall settings.
Common examples of this include:

1. Connecting to a database hosted outside of FL0
2. Connecting to an SFTP
3. Connecting to a third party REST API

FL0's outgoing IP addresses are broken up by region, you can either allow all of these, or only the ones for the region you have deployed to:

### AU-1 - Australia
```
3.105.50.240
52.62.78.249
52.65.239.223
```

### IE-1 - Ireland
```
52.208.91.145
54.220.162.246
54.78.155.63
```

### SG-1 - Singapore
```
13.215.133.178
52.74.76.241
52.74.232.11
```

### US-1 - United States
```
18.233.252.97
3.222.193.16
18.215.57.10
52.2.134.189
34.199.193.38
52.87.146.249
```

Please add these IPs to your firewall allowlist.
