<?php

namespace AppBundle\Controller;

use Pimcore\Bundle\AdminBundle\HttpFoundation\JsonResponse;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject;
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

  public function updateAction(Request $request)
  {
    $data = $request->getContent();

    if (!empty($data) && $this->canEdit()) {
      $params = json_decode($data, true);
      $product = Product::getById($params['id']);
      $images = [];
      foreach ($params['elements'] as $element) {
        $fn = 'set' . ucfirst($element['name']);
        if ($fn != 'setImages') {
          $value = $element['value'];
        }
        else {
          foreach ($element['value'] as $imgElement) {
            $images[] = Asset::getById($imgElement['id']);
          }
          $value = $images;
        }
          $product->$fn($value);
      }
      $product->save();

      return new JsonResponse([
        'success' => true,
        'data' => $params,
      ]);
    }
  }
}
