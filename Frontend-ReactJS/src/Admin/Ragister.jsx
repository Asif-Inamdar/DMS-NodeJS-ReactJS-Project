import React from 'react'

const Ragister = () => {
    return (
        <div class="container2">
            <div class="screen2">
                <div class="screen__content2">
                    <div className="row">
                        <div className="col-lg-6">
                            <form class="login2">
                                <div class="login__field2">
                                    <i class="login__icon2 fas fa-user"></i>
                                    <input type="text" class="login__input2" placeholder="Name" />
                                </div>
                                <div class="login__field2">
                                    <i class="login__icon2 fas fa-lock"></i>
                                    <input type="password" class="login__input2" placeholder="Mobile" />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <form class="login2">
                                <div class="login__field2">
                                    <i class="login__icon2 fas fa-user"></i>
                                    <input type="text" class="login__input2" placeholder="Email" />
                                </div>
                                <div class="login__field2">
                                    <i class="login__icon2 fas fa-lock"></i>
                                    <input type="password" class="login__input2" placeholder="Password" />
                                </div>
                            </form>
                        </div>
                        <div class="login__field2-2">
                            <i class="login__icon2 fas fa-lock"></i>
                            <input type="password" class="login__input2 w-25" placeholder="You Type" />
                        </div>
                    </div>
                    <button class=" login__submit0-2">
                                    <span class="button__text">Log In Now</span>
                                    <i class="button__icon fas fa-chevron-right"></i>
                                </button>
                    <div class="social-login2">
                        
                        <div class="social-icons">
                            <a href="#" class="social-login__icon2 fab fa-instagram"></a>
                            <a href="#" class="social-login__icon2 fab fa-facebook"></a>
                            <a href="#" class="social-login__icon2 fab fa-twitter"></a>
                        </div>
                    </div>
                </div>
                <div class="screen__background1">
                    <span class="screen__background__shape2 screen__background__shape4_2"></span>
                    <span class="screen__background__shape2 screen__background__shape3_2"></span>
                    <span class="screen__background__shape2 screen__background__shape2_2"></span>
                    <span class="screen__background__shape2 screen__background__shape1_2"></span>
                </div>
            </div>
        </div>
    )
}

export default Ragister