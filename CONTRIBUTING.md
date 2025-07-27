# Contributing to AI-Powered Task Manager

Thank you for your interest in contributing to the AI-Powered Task Manager! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/ai-task-manager.git
   cd ai-task-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Run Linting**
   ```bash
   npm run lint
   ```

## 📋 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Fixes**: Fix existing issues or problems
- **Feature Enhancements**: Improve existing functionality
- **New Features**: Add new capabilities to the application
- **Documentation**: Improve or add documentation
- **Performance**: Optimize code performance
- **UI/UX**: Enhance user interface and experience
- **Testing**: Add or improve test coverage
- **Accessibility**: Improve accessibility features

### Contribution Process

1. **Find or Create an Issue**
   - Check existing issues for bugs or feature requests
   - Create a new issue if none exists
   - Discuss your proposed changes before starting

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make Changes**
   - Follow the coding standards outlined below
   - Write clear, concise commit messages
   - Test your changes thoroughly

4. **Submit a Pull Request**
   - Push your branch to your fork
   - Create a pull request with a clear description
   - Link to any related issues
   - Wait for review and address feedback

## 🎯 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

```typescript
// Good
interface TaskFormData {
  title: string;
  description: string;
  category: TaskCategory;
}

// Avoid
const data: any = { ... };
```

### React Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Optimize with useMemo and useCallback when needed
- Follow the single responsibility principle

```typescript
// Good
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => {
    onEdit(task);
  }, [task, onEdit]);

  return (
    <div className="task-card">
      {/* Component content */}
    </div>
  );
};
```

### CSS and Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing using the 8px grid system
- Use semantic color names from the design system

```tsx
// Good
<div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">

// Avoid inline styles
<div style={{ backgroundColor: 'white', padding: '16px' }}>
```

### File Organization

- Keep components focused and single-purpose
- Separate business logic into utility functions
- Use meaningful file and folder names
- Group related functionality together

```
src/
├── components/
│   ├── TaskCard/
│   │   ├── TaskCard.tsx
│   │   ├── TaskCard.test.tsx
│   │   └── index.ts
├── hooks/
├── utils/
└── types/
```

## 🧪 Testing Guidelines

### Testing Requirements

- Write unit tests for utility functions
- Test component behavior and user interactions
- Ensure accessibility compliance
- Test responsive design on different screen sizes

### Testing Tools

- Jest for unit testing
- React Testing Library for component testing
- ESLint for code quality
- TypeScript compiler for type checking

## 📝 Commit Message Format

Use clear, descriptive commit messages following this format:

```
type(scope): brief description

Detailed explanation if necessary

Fixes #issue-number
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(tasks): add time tracking functionality

Implement start/stop timer for tasks with automatic duration calculation
and status updates when tracking begins.

Fixes #123
```

```
fix(ui): resolve mobile responsive issues in task cards

Adjust padding and font sizes for better mobile experience.
Ensure touch targets meet accessibility guidelines.

Fixes #456
```

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency**: Use established patterns and components
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Performance**: Optimize for fast loading and smooth interactions
- **Mobile-First**: Design for mobile devices first
- **User-Centered**: Focus on user needs and workflows

### Design System

Follow the established design system:

- **Colors**: Use the defined color palette
- **Typography**: Consistent font sizes and weights
- **Spacing**: 8px grid system
- **Components**: Reuse existing components when possible

## 🐛 Bug Reports

### Before Reporting

1. Check if the issue already exists
2. Try to reproduce the bug consistently
3. Test in different browsers if applicable
4. Clear cache and local storage

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 12.0]
- Device: [e.g., iPhone 12]

**Screenshots**
Add screenshots if applicable.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 📚 Documentation

### Documentation Standards

- Use clear, concise language
- Include code examples where helpful
- Keep documentation up-to-date with code changes
- Use proper markdown formatting

### Types of Documentation

- **README**: Project overview and setup
- **API Documentation**: Function and component APIs
- **User Guides**: How-to guides for users
- **Developer Guides**: Technical implementation details

## 🔍 Code Review Process

### Review Criteria

- **Functionality**: Does the code work as intended?
- **Code Quality**: Is the code clean and maintainable?
- **Performance**: Are there any performance concerns?
- **Security**: Are there any security vulnerabilities?
- **Testing**: Is the code adequately tested?
- **Documentation**: Is the code properly documented?

### Review Guidelines

- Be constructive and respectful in feedback
- Explain the reasoning behind suggestions
- Focus on the code, not the person
- Acknowledge good practices and improvements

## 🏆 Recognition

Contributors will be recognized in:
- Project README contributors section
- Release notes for significant contributions
- GitHub contributor graphs and statistics

## 📞 Getting Help

If you need help or have questions:

1. **Documentation**: Check existing documentation first
2. **Issues**: Search through existing issues
3. **Discussions**: Use GitHub Discussions for questions
4. **Community**: Join our community channels

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the AI-Powered Task Manager! Your contributions help make this project better for everyone.