<?php

namespace AppBundle\Controller;

use Pimcore\Model\DataObject\Product;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Zend\Paginator\Paginator;

class ProductController extends FrontendController
{
  protected $authorizationChecker;

  public function __construct(AuthorizationCheckerInterface $authorizationChecker)
  {
    $this->authorizationChecker = $authorizationChecker;
  }

  public function indexAction(Request $request)
  {
    // get a list of news objects and order them by date
    $productsList = new Product\Listing();
    $productsList->setOrderKey('name');
    $productsList->setOrder('DESC');

    $paginator = new Paginator($productsList);
    $paginator->setCurrentPageNumber($request->get('page'));
    $paginator->setItemCountPerPage(5);

    $images = [];
    foreach ($paginator as $product) {
      $images[] = Product::getById($product->o_id)->getImages();
    }

    $this->view->vars = [
      'products' => $paginator,
      'images' => $images,
    ];
  }

  public function detailAction($id)
  {
    $product = Product::getById($id);

    $images = [];
    foreach ($product->getImages() as $image) {
      $images[] = $image;
    }

    $vars = [
      'id' => $id,
      'name' => $product->getName(),
      'description' => $product->getDescription(),
      'images' => $images,
      'editable' => $this->canEdit(),
    ];

    $this->view->product = $vars;
  }

  private function canEdit()
  {
    return $this->authorizationChecker->isGranted('ROLE_ADMIN');
  }
}
