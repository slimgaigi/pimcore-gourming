<?php 

/** 
* Generated at: 2017-12-16T18:48:12+01:00
* Inheritance: no
* Variants: no
* Changed by: admin (4)
* IP: ::1


Fields Summary: 
- name [input]
- description [textarea]
- images [multihref]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\Product\Listing getByName ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByDescription ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByImages ($value, $limit = 0) 
*/

class Product extends Concrete {

public $o_classId = 8;
public $o_className = "Product";
public $name;
public $description;
public $images;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\Product
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get name - Product name
* @return string
*/
public function getName () {
	$preValue = $this->preGetValue("name"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->name;
	return $data;
}

/**
* Set name - Product name
* @param string $name
* @return \Pimcore\Model\DataObject\Product
*/
public function setName ($name) {
	$this->name = $name;
	return $this;
}

/**
* Get description - Product description
* @return string
*/
public function getDescription () {
	$preValue = $this->preGetValue("description"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->description;
	return $data;
}

/**
* Set description - Product description
* @param string $description
* @return \Pimcore\Model\DataObject\Product
*/
public function setDescription ($description) {
	$this->description = $description;
	return $this;
}

/**
* Get images - Product images
* @return \Pimcore\Model\Asset\image[] | \Pimcore\Model\Asset\video[]
*/
public function getImages () {
	$preValue = $this->preGetValue("images"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("images")->preGetData($this);
	return $data;
}

/**
* Set images - Product images
* @param \Pimcore\Model\Asset\image[] | \Pimcore\Model\Asset\video[] $images
* @return \Pimcore\Model\DataObject\Product
*/
public function setImages ($images) {
	$this->images = $this->getClass()->getFieldDefinition("images")->preSetData($this, $images);
	return $this;
}

protected static $_relationFields = array (
  'images' => 
  array (
    'type' => 'multihref',
  ),
);

public $lazyLoadedFields = array (
  0 => 'images',
);

}

