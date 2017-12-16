<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class installerProdDebugProjectContainerUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $trimmedPathinfo = rtrim($pathinfo, '/');
        $context = $this->context;
        $request = $this->request;
        $requestMethod = $canonicalMethod = $context->getMethod();
        $scheme = $context->getScheme();

        if ('HEAD' === $requestMethod) {
            $canonicalMethod = 'GET';
        }


        if (0 === strpos($pathinfo, '/install')) {
            // GET_install
            if ('/install' === $pathinfo) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_GET_install;
                }

                return array (  '_controller' => 'Pimcore\\Install\\Controller\\InstallController:indexAction',  '_route' => 'GET_install',);
            }
            not_GET_install:

            // POST_install
            if ('/install' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_POST_install;
                }

                return array (  '_controller' => 'Pimcore\\Install\\Controller\\InstallController:installAction',  '_route' => 'POST_install',);
            }
            not_POST_install:

            // POST_install_check
            if ('/install/check' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_POST_install_check;
                }

                return array (  '_controller' => 'Pimcore\\Install\\Controller\\InstallController:checkAction',  '_route' => 'POST_install_check',);
            }
            not_POST_install_check:

        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
