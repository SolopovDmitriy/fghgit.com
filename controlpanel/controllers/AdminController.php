<?php

namespace MyAdmApp {
    use MyApp\MethodExecuter as Mexec;
    use MyApp\View;

    class AdminController extends Mexec
    {
        private $header = [];
        private $content = [];
        private $footer = [];
        public function index()
        {
            echo "index index";
        }
        public function loginin(){
            View::Render(ADM_VIEWS_PATH."header".EXT, null, $this->header);
            View::Render(ADM_VIEWS_PATH."template".EXT, ADM_PAGES_PATH."loginin".EXT, $this->content);
            View::Render(ADM_VIEWS_PATH."footer".EXT, null, $this->footer);
        }
        public function register(){
            View::Render(ADM_VIEWS_PATH."header".EXT, null, $this->header);
            View::Render(ADM_VIEWS_PATH."template".EXT, ADM_PAGES_PATH."register".EXT, $this->content);
            View::Render(ADM_VIEWS_PATH."footer".EXT, null, $this->footer);
        }
        public function checkuser(){
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $email = htmlspecialchars(trim($_POST['email']));
                $password = htmlspecialchars(trim($_POST['password']));
                $password = hash("sha256", $password);
                $userM = new UserModel();
                varSuperDump($userM->checkUser($email, $password));
            }
        }
    }
}