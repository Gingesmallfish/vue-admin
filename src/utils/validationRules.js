export const validationRules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
    ],
    captcha: [
        {required: true, message: '请输入验证码', trigger: 'blur'},
        {min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur'}
    ]
};


export const validateConfirmPassword = (registerForm) => {
    return (rule, value, callback) => {
        if (value !== registerForm.value.password) {
            callback(new Error('两次输入的密码不一致'));
        } else {
            callback();
        }
    };
};

// 手机号码验证函数
export const validatePhone = (rule, value, callback) => {
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
    } else {
        callback();
    }
};

// 表单验证规则
export const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => validateConfirmPassword(registerForm)(rule, value, callback), trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 1, max: 20, message: '姓名长度在 1 到 20 个字符', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { validator: validatePhone, trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择用户角色', trigger: 'change' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
    ]
};
