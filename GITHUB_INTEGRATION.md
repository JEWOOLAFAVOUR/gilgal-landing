# GitHub Integration for Project Creation - Implementation Guide

## Backend Endpoints

### 1. **Get GitHub Auth URL**

```http
GET /api/auth/github/login
```

Response:

```json
{
  "success": true,
  "data": {
    "authUrl": "https://github.com/login/oauth/authorize?..."
  }
}
```

### 2. **GitHub Callback**

```http
GET /api/auth/github/callback?code=xxx&state=xxx
```

Automatically creates/updates user and stores GitHub token

### 3. **Check GitHub Connection Status**

```http
GET /api/auth/github/status
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "data": {
    "connected": true,
    "username": "johndoe"
  }
}
```

### 4. **Get User's Repositories** ⭐ NEW

```http
GET /api/auth/github/repositories?page=1&perPage=30
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "data": {
    "repositories": [
      {
        "id": 123456,
        "name": "my-repo",
        "full_name": "username/my-repo",
        "description": "A cool project",
        "html_url": "https://github.com/username/my-repo",
        "language": "TypeScript",
        "stargazers_count": 42,
        "forks_count": 5,
        "private": false
      }
    ],
    "page": 1,
    "perPage": 30,
    "total": 12
  }
}
```

### 5. **Disconnect GitHub**

```http
POST /api/auth/github/disconnect
Authorization: Bearer <token>
```

---

## Frontend Flow

### Step 1: GitHub Connection (CreateProjectPage - Step 1)

- Show GitHub authorization button
- Click → Opens: `https://localhost:3000/api/auth/github/login` (redirects to GitHub)
- User authorizes → GitHub redirects to `http://localhost:3000/api/auth/github/callback?code=xxx`
- Backend creates/updates user with GitHub token
- Frontend should redirect back to `/dashboard/create-project`

### Step 2: Fetch Real Repositories (CreateProjectPage - Step 2)

- After connection, call: `GET /api/auth/github/repositories`
- Display list of user's actual GitHub repositories
- Allow user to select one
- Show repo details: name, language, stars, description

### Step 3: Project Configuration

- User selects branch to deploy
- Set build commands (npm run build, etc.)
- Environment variables
- Framework auto-detected from package.json or user selection

---

## Frontend API Service (Already Updated)

```typescript
authApi.getGitHubAuthUrl(); // Get OAuth URL
authApi.getGitHubStatus(); // Check if connected
authApi.getGitHubRepositories(page, perPage); // Fetch user's repos
authApi.disconnectGitHub(); // Disconnect account
```

---

## Next Steps for CreateProjectPage

1. **Step 1 - GitHub Connection:**

   - Check GitHub status on component mount
   - If not connected: show "Connect GitHub" button that opens OAuth URL
   - If connected: show connected GitHub username and allow skip/reconnect

2. **Step 2 - Repository Selection:**

   - Fetch repositories using `authApi.getGitHubRepositories()`
   - Display real repositories instead of mock data
   - Show loading state while fetching
   - Handle pagination for users with many repos
   - Show repo metadata: language, stars, description

3. **Step 3 - Auto-detect Framework:**

   - Send selected repository to backend
   - Backend analyzes package.json to detect framework
   - Pre-fill framework selection based on detection

4. **Step 4 - Create Project:**
   - Call `POST /api/projects` with:
     - Repository URL
     - Framework
     - Branch to deploy
     - Environment variables
   - Show deployment status

---

## Testing Checklist

- [ ] Test GitHub OAuth flow (check auth callback works)
- [ ] Test fetching real repositories
- [ ] Test repository selection
- [ ] Test create project with real GitHub repo
- [ ] Test disconnect and reconnect flow
- [ ] Handle edge cases (no repos, private repos, many repos)
