# Security Guidelines - Perfume Haven Hub

## Overview
This document outlines security best practices and configurations for the Perfume Haven e-commerce application.

---

## 1. Secrets Management

### ✅ DO
- Store all secrets in environment variables (.env files)
- Use `.env.example` as template with placeholder values
- Rotate secrets regularly
- Use strong, random secrets (min 32 characters for JWT)
- Store secrets in platform's secure vault (Vercel, Render, Railway)

### ❌ DON'T
- Commit `.env` files to Git
- Hardcode secrets in code
- Share secrets via email or chat
- Use default/weak secrets
- Commit API keys or credentials

### Current Secrets in Your Project
```
.env (BACKEND) - Contains:
- MongoDB URI with credentials
- Google OAuth credentials
- GitHub OAuth credentials
- JWT Secret
```

**Action Required**: These files are in `.gitignore` - ensure they never get committed!

---

## 2. Authentication & Authorization

### JWT (JSON Web Tokens)
- ✅ Tokens stored in localStorage (httpOnly cookies preferred for production)
- ✅ 7-day expiration
- ✅ Separate tokens for different user types (admin, regular user)
- ✅ Token refresh mechanism (implement for production)

**Recommended Enhancement**:
```javascript
// Add httpOnly cookies for extra security
res.cookie('authToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

### OAuth 2.0 (Google, GitHub)
- ✅ Using official Passport.js strategies
- ✅ Callback URLs configured
- ✅ State parameter included (default in Passport)

**Production Setup**:
- Register production OAuth apps separately
- Use different credentials for dev/prod
- Whitelist production domains only
- Enable email verification

### Password Hashing
- ✅ Using bcryptjs for password hashing
- ✅ 10-round salt factor

---

## 3. Database Security

### MongoDB Atlas Configuration
- ✅ User authentication enabled
- ✅ Strong password required (20+ chars)

**Recommended**:
1. Create dedicated database user with minimal permissions:
```javascript
// In MongoDB Atlas, create user with specific roles:
// - Database User role (not Admin)
// - Only access to 'perfume_shop' database
```

2. Network Security:
```javascript
// IP Whitelist only production servers:
- Development: 0.0.0.0/0 (or your home IP)
- Production: Add specific server IPs only
```

3. Backup Strategy:
```javascript
// Enable automated backups:
- Backup frequency: Daily
- Retention: 35 days
- Test restore regularly
```

---

## 4. API Security

### Input Validation
```javascript
// ✅ Already implemented in controllers:
- Cart validation
- Product validation
- User input sanitization
```

**Enhancement for Production**:
```javascript
// Add request validation middleware
import { body, validationResult } from 'express-validator';

app.post('/api/cart/add', [
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1, max: 100 }),
  body('size').isString().trim(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### Rate Limiting
```javascript
// Add to prevent brute force attacks
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 5 attempts
});

app.post('/api/auth/login', authLimiter, ...);
```

### CORS Configuration
```javascript
// ✅ Already configured in server.js
// Update for production:

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### HTTPS
- ✅ Vercel/Render auto-enable HTTPS
- ✅ Automatic certificate renewal

**Ensure**:
```javascript
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

---

## 5. Frontend Security

### XSS (Cross-Site Scripting) Prevention
- ✅ React escapes JSX by default
- ✅ No `dangerouslySetInnerHTML` used

**Best Practices**:
```typescript
// ✅ Safe - React escapes automatically
<div>{userInput}</div>

// ❌ Avoid - Only for trusted content
<div dangerouslySetInnerHTML={{ __html: content }} />
```

### CSRF (Cross-Site Request Forgery) Protection
```javascript
// Add CSRF middleware (express-csrf or similar)
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: false });

app.post('/api/cart/add', csrfProtection, (req, res) => {
  // Process request
});
```

### Content Security Policy (CSP)
```javascript
// Add CSP headers
import helmet from 'helmet';

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "https:", "data:"],
  }
}));
```

---

## 6. Environment-Specific Security

### Development
```
- NODE_ENV=development
- Allow CORS from localhost:5173
- Detailed error messages
- Console logging enabled
```

### Production
```
- NODE_ENV=production
- Restrict CORS to frontend domain
- Generic error messages (no stack traces)
- Logging to file/service
- Rate limiting enabled
- HTTPS enforced
```

---

## 7. Error Handling

### ❌ DON'T expose sensitive info
```javascript
// Bad - Exposes stack trace and database info
res.status(500).json({
  error: error.message,
  stack: error.stack,
  query: mongoQuery
});
```

### ✅ DO generic messages
```javascript
// Good - Generic message in production
res.status(500).json({
  message: 'An error occurred. Please try again later.',
  ...(process.env.NODE_ENV === 'development' && { error: error.message })
});
```

---

## 8. Dependency Security

### Keep Dependencies Updated
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update

# Check for outdated packages
npm outdated
```

### Security Scanning
```bash
# Use GitHub's security features:
1. Enable Dependabot alerts
2. Enable dependency scanning
3. Review security advisories regularly
```

---

## 9. Git & Repository Security

### Already Configured
- ✅ `.env` files in `.gitignore`
- ✅ No hardcoded secrets in code
- ✅ `.gitignore` includes sensitive patterns

### Before Public Release
```bash
# Verify no secrets in git history
git log -p --all -S "GOCSPX" | head
git log -p --all -S "mongodb+srv" | head
git log -p --all -S "JWT_SECRET" | head

# If secrets found, rewrite history
# (See DEPLOY.md for instructions)
```

### Git Best Practices
- Use branch protection rules
- Require code reviews for main branch
- Enable signed commits
- Use fine-grained personal access tokens (not passwords)

---

## 10. Monitoring & Logging

### Setup Logging Service (Optional)
```javascript
// For production, use service like:
// - Sentry (error tracking)
// - LogRocket (user session replay)
// - DataDog (monitoring)

import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});
```

### Log Important Events
```javascript
// Log security-relevant events
logger.info('User login', { userId, provider: 'google' });
logger.warn('Failed login attempt', { email, attempts });
logger.error('Unauthorized API access', { userId, endpoint });
```

---

## 11. Payment Security (Future Implementation)

When implementing payments:
- ✅ Use established payment processors (Stripe, PayPal)
- ❌ Never handle card data directly
- ❌ Never store card details
- ✅ Use tokenization
- ✅ Comply with PCI DSS
- ✅ Add 3D Secure authentication

---

## 12. Compliance Checklist

- [ ] GDPR compliant (for EU users)
- [ ] Privacy policy available
- [ ] Terms of service available
- [ ] Data deletion mechanism
- [ ] Cookie consent banner
- [ ] Secure data storage
- [ ] Data backup strategy

---

## Quick Security Audit Checklist

Before deploying to production:

```
API Security:
- [ ] HTTPS enforced
- [ ] CORS whitelist configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose internals
- [ ] No hardcoded secrets in code

Database:
- [ ] Strong password on database user
- [ ] IP whitelist configured
- [ ] Regular backups enabled
- [ ] Credentials in environment variables

Frontend:
- [ ] No sensitive data in localStorage except JWT
- [ ] OAuth state parameter verified
- [ ] HTTPS only for API calls
- [ ] CSP headers configured

Code:
- [ ] No console.logs with sensitive data
- [ ] No commented-out secrets
- [ ] Dependencies up to date
- [ ] npm audit passes

Deployment:
- [ ] .env files not committed
- [ ] NODE_ENV=production in prod
- [ ] Environment variables set in platform
- [ ] OAuth callbacks updated for prod URLs
- [ ] Database backup configured
```

---

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)

---

## Reporting Security Issues

If you discover a security vulnerability:
1. **DO NOT** create a public issue
2. Email: security@example.com with details
3. Include: Description, steps to reproduce, potential impact
4. Allow 30 days for response before public disclosure

---

Last Updated: January 2026
Review Schedule: Every 3 months or after major changes
