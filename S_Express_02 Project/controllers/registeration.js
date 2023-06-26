let usersData = [{email:"", password:""}];


export const userRegister = async (user) => {
    const {username,email,password} = user;
   
    try {
        const checkUser = await usersData.find(user =>  user.email === email  )

        if(checkUser){
            res.status(400).json({
                error:{
                    errorMessage: ['Your Email already existed']
                }
            })
        }
                const token = jwt.sign({
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    image: user.image,
                    registerTime: userCreate.createdAt
                }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP});
                console.log(token);
                console.log('Registration Complete Successfully');

              const options = {expires: new Date(Date.now() + process.env.TOKEN_EXP
                 *24 * 60 * 60 * 1000)};
              res.status(201).cookie('authToken',token,options).json({
                successMessage : 'Your Register is Successful', token
            })
        }
      
      catch(error){
        res.status(400).json({
            error:{
                errorMessage: [`Internal Server Error`]
            }
        })

      }
}


export const userLogin = async (req,res) => {
    //console.log(req.body);
    const error = [];
    const {email ,password} = req.body;

    if(!email){
        error.push('Please provide your email')
       }
     if(!password){
        error.push('Please provide your password')
       }
     if(email && !validator.isEmail(email)){
        error.push('Please provide your Valid Email')
       }
    
       if(error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        })
       }else {
             
        try{
            const checkUser = await registerModel.findOne({
                email: email
            }.select("+password"));
             if(checkUser){
                const matchPassword = await bcrypt.compare(password,checkUser.password);
                if(matchPassword){
                    
                    const token = jwt.sign({
                        id: checkUser._id,
                        userName: checkUser.userName,
                        email: checkUser.email,
                        image: checkUser.image,
                        registerTime: checkUser.createdAt
                    }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP});
                    console.log(token);
                    console.log('Login Complete Successfully');

                  const options = {expires: new Date(Date.now() + process.env.TOKEN_EXP
                     *24 * 60 * 60 * 1000)};
                     
                  res.status(200).cookie('authToken',token,options).json({
                    successMessage : 'Your Login is Successful', token
                     })
                }else {
                          res.status(400).json({
                            error:{
                                errorMessage: ["The Password is not Valid"]
                            }
                          })
                }
             } else {
                res.status(400).json({
                  error:{
                      errorMessage: ["The Email is not Found"]
                  }
                })
      }
          
        }
        catch{
        
                res.status(404).json({
                  error:{
                      errorMessage: ["Internal Server Error"]
                  }
                })
      

        }
      
       }
}

export const userLogout = (req,res) => {
    res.status(200).cookie('authToken', '').json({
         success : true
    })
}