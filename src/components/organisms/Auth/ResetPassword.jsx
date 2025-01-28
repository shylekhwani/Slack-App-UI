import { useEffect, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";

import { useConfirmPassword } from "@/hooks/apis/auth/useConfirmPassword";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const { confirmPasswordMutation, isLoading, isSuccess, isError } = useConfirmPassword();

  useEffect(() => {
    if (token) {
      console.log("Token received in ResetPassword component:", token);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return;

    await confirmPasswordMutation({ resetToken: token, newPassword });

    setNewPassword("");

  };
  
  useEffect(()=> {
    if(isSuccess) {
          setTimeout(()=>{
          navigate('/auth/signin');
          },3000);
       };
     },[isSuccess,navigate]);


  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="input-group">
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="password-input"
            />
          </div>
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>
        {isSuccess && <p className="success-message">Password updated successfully!</p>}
        {isError && <p className="error-message">Failed to reset password. Try again.</p>}
      </div>
    </div>
  );
};

