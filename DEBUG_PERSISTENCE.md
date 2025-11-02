# Issue Persistence Debugging Guide

## Current Flow

### When You Create an Issue:
1. Click on map → Report modal opens
2. Fill in issue details → Click Submit
3. New issue added to `issues` state
4. useEffect saves to localStorage (only user issues, filtering out demo)
5. Issue appears in list immediately

### When You Reload Page:
1. Component mounts → issues = [3 demo issues]
2. Auth loads → `isAuthenticated` becomes `true`
3. useEffect runs → loads from localStorage
4. If localStorage has user issues → combine with demo issues
5. If localStorage is empty → show only demo issues

## How to Test

### Step 1: Clear Browser Storage
```javascript
// Open browser console (F12) and run:
localStorage.clear()
console.clear()
```

### Step 2: Create an Issue
1. Go to http://localhost:8080/portal
2. **Login first** (create account or use test account)
3. Click on map to open report modal
4. Fill in issue details (title, category, description)
5. Click "Submit Issue"

### Step 3: Check Console Logs
Look for these log messages (in order):
```
👤 Current user: {uid, email, displayName...}
📝 Adding new issue: {issue details}
✅ Issue reported. New count: 4
🔍 All issues in state: 4 issues
🔍 Filtered user issues: 1 user issue
💾 Saved 1 user issues to localStorage
```

### Step 4: Check localStorage
```javascript
// In browser console:
localStorage.getItem("civicconnect_issues")
// Should show: [{"id":"issue-...", "title":"Your Issue", ...}]
```

### Step 5: Reload Page
1. Refresh page (Ctrl+R / Cmd+R)
2. You should see your issue + 3 demo issues (4 total)

### Step 6: Check Console After Reload
```
🔄 Auth state changed - isAuthenticated: true user: {Object}
📂 Raw localStorage data: [{"id":"issue-...", ...}]
✅ Logged in - loaded 1 user reports + 3 demo issues
```

## Troubleshooting

### If issues still don't persist:

**Check 1: Is localStorage actually saving?**
```javascript
// Create an issue, then check:
localStorage.getItem("civicconnect_issues")
// Should be a non-empty array string
```

**Check 2: Are you logged in?**
```javascript
// Check in console:
// Look for "👤 Current user: Object" log
// user.uid should be defined
```

**Check 3: Is the issue marked as user-owned?**
```javascript
// After creating issue, check:
localStorage.getItem("civicconnect_issues")
// Issue should NOT have id starting with "demo-"
// Issue should have a real userId (not "demo")
```

**Check 4: Are demo issues being filtered correctly?**
```javascript
// In console:
JSON.parse(localStorage.getItem("civicconnect_issues"))
// Should show 0-many issues, ALL with userId NOT equal to "demo"
```

## Common Issues

### Issue 1: "💾 Saved 0 user issues"
- **Cause**: All issues shown are demo issues
- **Solution**: Make sure you're creating NEW issues (not demo ones)
- **Check**: Look for `🔍 Filtered user issues: 0`

### Issue 2: localStorage shows "[]" (empty array)
- **Cause**: Either no user issues created, or they're being filtered out as demo
- **Solution**: Create a new issue and check the logs immediately after

### Issue 3: After reload, still see 0 user issues
- **Cause**: localStorage might be empty OR auth isn't loading properly
- **Solution**: 
  1. Check `🔄 Auth state changed` log
  2. Verify user.uid is showing
  3. Check `📂 Raw localStorage data`

## Expected Behavior - Working System

```
👤 Current user: {uid: "xyz123", email: "test@example.com", ...}
📝 Adding new issue: {id: "issue-1234567890", title: "My Issue", userId: "xyz123", ...}
✅ Issue reported. New count: 4  (3 demo + 1 user)
💾 Saved 1 user issues to localStorage
[Page Reload]
🔄 Auth state changed - isAuthenticated: true
📂 Raw localStorage data: [{"id":"issue-1234567890", ...}]
✅ Logged in - loaded 1 user reports + 3 demo issues
[User sees 4 total issues including their own]
```

## If Still Not Working

Add this to browser console to manually test:
```javascript
// Manually create test data
const testIssue = {
  id: "issue-manual",
  userId: "test-user-123",
  userName: "Test User",
  title: "Manual Test Issue",
  category: "pothole",
  description: "This is a test",
  status: "reported",
  location: {lat: 28.7041, lng: 77.1025},
  upvotes: 1
};

// Save to localStorage
localStorage.setItem("civicconnect_issues", JSON.stringify([testIssue]));

// Reload page and check if it appears
```

✅ All logs should show the issue is being saved and loaded correctly!
