# Setup Nginx Redirect: msei.dev → calc.msei.dev

## Instructions for Redirecting Root Domain to Calculator Subdomain

### Step 1: Copy the Configuration File

The nginx configuration file has been created at `msei.dev.conf` in your project root.

On your server, run:

```bash
# Copy the config to nginx sites-available
sudo cp /path/to/msei.dev.conf /etc/nginx/sites-available/msei.dev.conf

# Or create it manually:
sudo nano /etc/nginx/sites-available/msei.dev.conf
```

Then paste this content:

```nginx
# HTTP server - redirect to HTTPS
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

### Step 2: Enable the Site

```bash
# Create symlink to sites-enabled
sudo ln -s /etc/nginx/sites-available/msei.dev.conf /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### Step 3: Verify the Redirect

```bash
# Test HTTP redirect
curl -I http://msei.dev
# Should return: 301 Moved Permanently
# Location: https://calc.msei.dev/

# Test HTTPS redirect
curl -I https://msei.dev
# Should return: 301 Moved Permanently
# Location: https://calc.msei.dev/
```

### Step 4: Test in Browser

1. Visit `http://msei.dev` - should redirect to `https://calc.msei.dev`
2. Visit `https://msei.dev` - should redirect to `https://calc.msei.dev`
3. Visit `http://www.msei.dev` - should redirect to `https://calc.msei.dev`

## Notes

- This configuration preserves the request URI, so `https://msei.dev/about` will redirect to `https://calc.msei.dev/about`
- The SSL certificate for `msei.dev` must already exist (which it does based on your certbot setup)
- Both HTTP and HTTPS are configured for complete coverage
- The www subdomain is also handled

## Troubleshooting

If redirect doesn't work:

1. **Check if config is enabled:**
   ```bash
   ls -la /etc/nginx/sites-enabled/ | grep msei.dev
   ```

2. **Check nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Verify SSL certificates exist:**
   ```bash
   sudo ls -la /etc/letsencrypt/live/msei.dev/
   ```

4. **Check for conflicting configs:**
   ```bash
   nginx -T | grep "server_name.*msei.dev"
   ```

5. **Reload nginx after changes:**
   ```bash
   sudo systemctl reload nginx
   ```
