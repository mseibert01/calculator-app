# Nginx Server Commands: Redirect msei.dev to calc.msei.dev

## Quick Setup (Run these commands on your server)

### Step 1: Create the Configuration File

```bash
# Create nginx config file for msei.dev
sudo nano /etc/nginx/sites-available/msei.dev.conf
```

**Paste this content:**

```nginx
# HTTP server - redirect to HTTPS calc subdomain
server {
    listen 80;
    server_name msei.dev www.msei.dev;
    return 301 https://calc.msei.dev$request_uri;
}

# HTTPS server - redirect to calc subdomain
server {
    listen 443 ssl http2;
    server_name msei.dev www.msei.dev;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/msei.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/msei.dev/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect everything to calc.msei.dev
    return 301 https://calc.msei.dev$request_uri;
}
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 2: Enable the Configuration

```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/msei.dev.conf /etc/nginx/sites-enabled/msei.dev.conf

# Test nginx configuration for syntax errors
sudo nginx -t
```

**Expected output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Step 3: Reload Nginx

```bash
# Reload nginx to apply changes
sudo systemctl reload nginx

# Verify nginx is running
sudo systemctl status nginx
```

### Step 4: Verify the Redirect Works

```bash
# Test HTTP redirect (should show 301 and Location header)
curl -I http://msei.dev

# Test HTTPS redirect
curl -I -k https://msei.dev

# Test in browser
# Visit: http://msei.dev (should redirect to https://calc.msei.dev)
```

## Troubleshooting

### If redirect doesn't work:

**Check if config file exists:**
```bash
ls -la /etc/nginx/sites-available/msei.dev.conf
ls -la /etc/nginx/sites-enabled/msei.dev.conf
```

**Check nginx error logs:**
```bash
sudo tail -50 /var/log/nginx/error.log
```

**Check if SSL certificate exists:**
```bash
sudo ls -la /etc/letsencrypt/live/msei.dev/
```

**If SSL cert doesn't exist, create it:**
```bash
sudo certbot certonly --nginx -d msei.dev -d www.msei.dev
```

**Remove conflicting default config (if needed):**
```bash
# Check if default config is capturing msei.dev
sudo nginx -T | grep -B 5 "server_name.*msei.dev"

# If there's a conflict, disable default
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### Common Issues:

**1. Port 80/443 already in use:**
```bash
# Check what's using the ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Make sure no other config is conflicting
sudo nginx -T | grep "listen.*80"
sudo nginx -T | grep "listen.*443"
```

**2. SSL certificate issues:**
```bash
# Renew certificates if expired
sudo certbot renew

# Test certificate
sudo certbot certificates
```

**3. Permission denied:**
```bash
# Ensure nginx user has permission
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

## Verification Checklist

After setup, verify all these redirect properly:

- [ ] `http://msei.dev` → `https://calc.msei.dev`
- [ ] `https://msei.dev` → `https://calc.msei.dev`
- [ ] `http://www.msei.dev` → `https://calc.msei.dev`
- [ ] `https://www.msei.dev` → `https://calc.msei.dev`
- [ ] `http://msei.dev/about` → `https://calc.msei.dev/about` (preserves path)

## Complete Commands (Copy-Paste Ready)

```bash
# All-in-one setup command
sudo bash <<'SCRIPT'
cat > /etc/nginx/sites-available/msei.dev.conf <<'EOF'
server {
    listen 80;
    server_name msei.dev www.msei.dev;
    return 301 https://calc.msei.dev$request_uri;
}

server {
    listen 443 ssl http2;
    server_name msei.dev www.msei.dev;
    ssl_certificate /etc/letsencrypt/live/msei.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/msei.dev/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    return 301 https://calc.msei.dev$request_uri;
}
EOF

ln -sf /etc/nginx/sites-available/msei.dev.conf /etc/nginx/sites-enabled/msei.dev.conf
nginx -t && systemctl reload nginx
SCRIPT

# Verify
curl -I http://msei.dev
```
