const decodePanel = (data, xmlDom) => {
  const DrawingVM = xmlDom.getElementsByTagName('DrawingVM')[0];
  const DataSource = xmlDom.getElementsByTagName('DataSource')[0];

  const {
    DefaultFontFamilyAsString, DefaultFontSize, Field1SelectedIndex, Field2SelectedIndex, FrontSideOpacity, HGuides, IsFront, Layers, MatchedPhotosSerialized, OrphanPhotos, PrintSettings,
    Size, BottomMargin, Columns, IsLandscape, LeftMargin, Width, Height, PageHeight, PageWidth, RightMargin, Rows, TopMargin, SelectedLayer, SnapToGrid, SnapToGuides, VGuides, Zoom,
    ConnectionString, IsQuery, IsQueryExecuting, Query, RaiseExceptionOnError, SelectedProvider, SelectedTable, TextFileHasHeaders, Drawing
  } = elements(xmlDom);
  
  DefaultFontFamilyAsString.setAttribute('i:nil', true);
  DefaultFontFamilyAsString.textContent = data.DefaultFont;
  DefaultFontSize.textContent = data.DefaultFontSize;
  Field1SelectedIndex.textContent = 0;
  Field2SelectedIndex.textContent = 0;
  FrontSideOpacity.textContent = 1;
  HGuides.setAttribute('i:nil', true);
  IsFront.textContent = true;
  Layers.setAttribute('i:nil', true);
  MatchedPhotosSerialized.setAttribute('xmlns:d2p1', 'http://schemas.microsoft.com/2003/10/Serialization/Arrays');
  MatchedPhotosSerialized.setAttribute('z:Size', '0');
  OrphanPhotos.setAttribute('z:Size', '0');
  PrintSettings.setAttribute('i:nil', true);
  BottomMargin.textContent = 0;
  Columns.textContent = 1;
  IsLandscape.textContent = false;
  LeftMargin.textContent = 0;
  PageHeight.textContent = data.Height;
  PageWidth.textContent = data.Width;
  RightMargin.textContent = 0;
  Rows.textContent = 1;
  TopMargin.textContent = 0;
  PrintSettings.appendChild(BottomMargin);
  PrintSettings.appendChild(Columns);
  PrintSettings.appendChild(IsLandscape);
  PrintSettings.appendChild(LeftMargin);
  PrintSettings.appendChild(PageHeight);
  PrintSettings.appendChild(PageWidth);
  PrintSettings.appendChild(RightMargin);
  PrintSettings.appendChild(Rows);
  PrintSettings.appendChild(TopMargin);
  SelectedLayer.setAttribute('i:nil', true);
  Width.textContent = data.Width;
  Height.textContent = data.Height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  SnapToGrid.textContent = false;
  SnapToGuides.textContent = true;
  VGuides.setAttribute('z:Size', 0)
  Zoom.textContent = 1;

  DrawingVM.appendChild(DefaultFontFamilyAsString);
  DrawingVM.appendChild(DefaultFontSize);
  DrawingVM.appendChild(Field1SelectedIndex);
  DrawingVM.appendChild(Field2SelectedIndex);
  DrawingVM.appendChild(FrontSideOpacity);
  DrawingVM.appendChild(HGuides);
  DrawingVM.appendChild(IsFront);
  DrawingVM.appendChild(Layers);
  DrawingVM.appendChild(MatchedPhotosSerialized);
  DrawingVM.appendChild(OrphanPhotos);
  DrawingVM.appendChild(PrintSettings);
  DrawingVM.appendChild(SelectedLayer);
  DrawingVM.appendChild(Size);
  DrawingVM.appendChild(SnapToGrid);
  DrawingVM.appendChild(SnapToGuides);
  DrawingVM.appendChild(VGuides);
  DrawingVM.appendChild(Zoom);

  IsQuery.textContent = false;
  IsQueryExecuting.textContent = false;
  Query.setAttribute('i:nil', true);
  RaiseExceptionOnError.textContent = false;
  SelectedProvider.textContent = 'System.Data.OleDb';
  SelectedTable.setAttribute('i:nil', true);
  TextFileHasHeaders.setAttribute('i:nil', true);

  DataSource.appendChild(ConnectionString);
  DataSource.appendChild(Drawing);
  DataSource.appendChild(IsQuery);
  DataSource.appendChild(IsQueryExecuting);
  DataSource.appendChild(Query);
  DataSource.appendChild(RaiseExceptionOnError);
  DataSource.appendChild(SelectedProvider);
  DataSource.appendChild(SelectedTable);
  DataSource.appendChild(TextFileHasHeaders);

  
  
}

const decodeRect = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, ''));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, BorderStyle, X, Y, Width, Height, Rotation, BorderThickness, CornerRadius
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  X.textContent = data.Location.x;
  Y.textContent = data.Location.y;
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName;
  Opacity.textContent = data.Opacity;
  PivotX.textContent = data.Rotation.x;
  PivotY.textContent = data.Rotation.y;
  Width.textContent = data.Size.width;
  Height.textContent = data.Size.height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  Rotation.textContent = data.Rotation.a;
  data.BorderStyle.split(' ').forEach(val => {
    var BorderStyleElement = xmlDom.createElement('d5p1:double');
    BorderStyleElement.textContent = val;
    BorderStyle.appendChild(BorderStyleElement);
  })
  BorderStyle.setAttribute('xmlns:d5p1', 'http://schemas.microsoft.com/2003/10/Serialization/Arrays');
  BorderThickness.textContent = data.BorderThickness;
  CornerRadius.textContent = data.CornerRadius;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(Rotation);
  DrawingObject.appendChild(BorderStyle);
  DrawingObject.appendChild(BorderThickness);
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Fill.Style, 'Fill', data.Fill.Color));
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Outline.Style, 'Stroke', data.Outline.Color));
  DrawingObject.appendChild(CornerRadius);

  children.appendChild(DrawingObject);

}

const decodeEllipse = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, ''));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, BorderStyle, X, Y, Width, Height, Rotation, BorderThickness
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  X.textContent = data.Location.x;
  Y.textContent = data.Location.y;
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName;
  Opacity.textContent = data.Opacity;
  PivotX.textContent = data.Rotation.x;
  PivotY.textContent = data.Rotation.y;
  Width.textContent = data.Size.width;
  Height.textContent = data.Size.height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  Rotation.textContent = data.Rotation.a;
  data.BorderStyle.split(' ').forEach(val => {
    var BorderStyleElement = xmlDom.createElement('d5p1:double');
    BorderStyleElement.textContent = val;
    BorderStyle.appendChild(BorderStyleElement);
  })
  BorderStyle.setAttribute('xmlns:d5p1', 'http://schemas.microsoft.com/2003/10/Serialization/Arrays');
  BorderThickness.textContent = data.BorderThickness;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(Rotation);
  DrawingObject.appendChild(BorderStyle);
  DrawingObject.appendChild(BorderThickness);
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Fill.Style, 'Fill', data.Fill.Color));
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Outline.Style, 'Stroke', data.Outline.Color));

  children.appendChild(DrawingObject);
}

const decodePicture = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, '').replace('Picture', 'Image'));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, X, Y, Width, Height, Rotation, DesignerSource, OpacityMask, Source, Stretch, TransparencyTolerance
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  X.textContent = data.Location.x;
  Y.textContent = data.Location.y;
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName.replace('Picture', 'Image');
  Opacity.textContent = parseInt(data.Opacity) / 100;
  PivotX.textContent = data.Rotation.x;
  PivotY.textContent = data.Rotation.y;
  Width.textContent = data.Size.width;
  Height.textContent = data.Size.height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  Rotation.textContent = data.Rotation.a;
  DesignerSource.textContent = data.DesignerSource[1];
  OpacityMask.setAttribute('xmlns:d5p1', 'http://schemas.datacontract.org/2004/07/System.Windows.Media');
  OpacityMask.setAttribute('i:nil', true);

  Source.textContent = data.Source;
  Stretch.textContent = data.Stretch;
  var TransparencyColor = getSolidColorElement('TransparencyColor', data.TransparencyColor.split(' ')[6], xmlDom);
  TransparencyColor.setAttribute('xmlns:d5p1', 'http://schemas.datacontract.org/2004/07/System.Windows.Media');

  TransparencyTolerance.textContent = data.TransparencyTolerance;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(Rotation);
  DrawingObject.appendChild(DesignerSource);
  DrawingObject.appendChild(OpacityMask);
  DrawingObject.appendChild(Source);
  DrawingObject.appendChild(Stretch);
  DrawingObject.appendChild(TransparencyColor);
  DrawingObject.appendChild(TransparencyTolerance);

  children.appendChild(DrawingObject);  
}

const decodeBarcode = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, ''));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, X, Y, Width, Height, Rotation, Stretch, BarcodeType, Data, DesignerData
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  X.textContent = data.Location.x;
  Y.textContent = data.Location.y;
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName;
  Opacity.textContent = parseInt(data.Opacity) / 100;
  PivotX.textContent = data.Rotation.x;
  PivotY.textContent = data.Rotation.y;
  Width.textContent = data.Size.width;
  Height.textContent = data.Size.height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  Rotation.textContent = data.Rotation.a;
  BarcodeType.textContent = data.Type;
  Data.textContent = data.Data;
  DesignerData.textContent = data.DesignData;
  Stretch.textContent = data.Stretch;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(Rotation);
  DrawingObject.appendChild(BarcodeType);
  DrawingObject.appendChild(Data);
  DrawingObject.appendChild(DesignerData);
  // DrawingObject.appendChild(getDecodeColor(xmlDom, data.Fill.Style, 'Fill', data.Fill.Color));
  DrawingObject.appendChild(Stretch);
  // DrawingObject.appendChild(getDecodeColor(xmlDom, data.Outline.Style, 'Stroke', data.Outline.Color));

  children.appendChild(DrawingObject);  
}

const decodeLine = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, ''));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, BorderStyle, Thickness, X1, X2, Y1, Y2, X, Y, Width, Height
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName;
  Opacity.textContent = data.Opacity;
  PivotX.textContent = 0;
  PivotY.textContent = 0;
  Width.textContent = 0;
  Height.textContent = 0;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  data.Style.split(' ').forEach(val => {
    var BorderStyleElement = xmlDom.createElement('d5p1:double');
    BorderStyleElement.textContent = val;
    BorderStyle.appendChild(BorderStyleElement);
  })
  BorderStyle.setAttribute('xmlns:d5p1', 'http://schemas.microsoft.com/2003/10/Serialization/Arrays');

  Thickness.textContent = data.Thickness;
  X1.textContent = data.Start.x;
  Y1.textContent = data.Start.y;
  X2.textContent = data.End.x;
  Y2.textContent = data.End.y;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(BorderStyle);
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Stroke.Style, 'Stroke', data.Stroke.Color));
  DrawingObject.appendChild(Thickness);
  DrawingObject.appendChild(X1);
  DrawingObject.appendChild(X2);
  DrawingObject.appendChild(Y1);
  DrawingObject.appendChild(Y2);

  children.appendChild(DrawingObject);
}

const decodeText = (data, xmlDom) => {
  const children = xmlDom.getElementsByTagName('ActiveLayer')[0].getElementsByTagName('Children')[0];

  const DrawingObject = xmlDom.createElement('DrawingObject');
  DrawingObject.setAttribute('i:type', data.ObjectName.replace(/[0-9]/g, '').replace('Text', 'Label'));

  const {
    IsGroup, IsLocked, IsSelected, IsVisible, LastPivot, Location, Name, Opacity, ParentID, PivotX, PivotY,
    Size, ZOrder, X, Y, Width, Height, Rotation, FontFamilyAsString, FontSize, FontStretchAsString, FontStyleAsString, FontWeightAsString,
    HorizontalAlignment, LineHeight, DesignerText, SameAsDesignerText, ShowBorder, Text, TextAlignment, TextDecoration, TextWrapping, VerticalAlignment
  } = elements(xmlDom);

  IsGroup.textContent = false;
  IsLocked.textContent = false;
  IsSelected.textContent = false;
  IsVisible.textContent = true;
  X.textContent = 0;
  Y.textContent = 0;
  LastPivot.appendChild(X);
  LastPivot.appendChild(Y);
  X.textContent = data.Location.x;
  Y.textContent = data.Location.y;
  Location.appendChild(X);
  Location.appendChild(Y);
  Name.textContent = data.ObjectName.replace('Text', 'Label');
  Opacity.textContent = parseInt(data.Opacity) / 100;
  PivotX.textContent = data.Rotation.x;
  PivotY.textContent = data.Rotation.y;
  Width.textContent = data.Size.width;
  Height.textContent = data.Size.height;
  Size.appendChild(Width);
  Size.appendChild(Height);
  ZOrder.textContent = data['Z-Order'];
  Rotation.textContent = data.Rotation.a;
  DesignerText.textContent = data.DesignerText;
  FontFamilyAsString.textContent = data.FontFamily;
  FontSize.textContent = data.FontSize;
  FontStretchAsString.textContent  = data.FontStretch;
  FontStyleAsString.textContent = data.FontStyle;

  var fontWeight = [
    { name: 'Extrabold', value: 800 },
    { name: 'Extralight', value: 200 },
    { name: 'Black', value: 900 },
    { name: 'Light', value: 300 },
    { name: 'Medium', value: 500 },
    { name: 'Normal', value: 400 },
    { name: 'Semibold', value: 600 },
    { name: 'Thin', value: 100},
    { name: 'Bold', value: 700 }
  ];

  var weight_sel = '';
  fontWeight.map((item, index) => {
    if (item.value === parseInt(data.FontWeight)) weight_sel = item.name;
  })

  FontWeightAsString.textContent = weight_sel;
  HorizontalAlignment.textContent = 'Center';
  LineHeight.textContent = data.LineHeight;
  SameAsDesignerText.textContent = false;
  ShowBorder.textContent = data.ShowBorder;
  Text.textContent = data.PrintText;
  TextAlignment.textContent = data.HAlignment;
  TextDecoration.textContent = data.TextDecoration;
  TextWrapping.textContent = data.TextWrapping;
  VerticalAlignment.textContent = data.VAlignment === 'Middle' ? 'Center' : data.VAlignment;

  DrawingObject.appendChild(IsGroup);
  DrawingObject.appendChild(IsLocked);
  DrawingObject.appendChild(IsSelected);
  DrawingObject.appendChild(IsVisible);
  DrawingObject.appendChild(LastPivot);
  DrawingObject.appendChild(Location);
  DrawingObject.appendChild(Name);
  DrawingObject.appendChild(Opacity);
  DrawingObject.appendChild(ParentID);
  DrawingObject.appendChild(PivotX);
  DrawingObject.appendChild(PivotY);
  DrawingObject.appendChild(Size);
  DrawingObject.appendChild(ZOrder);
  DrawingObject.appendChild(Rotation);
  DrawingObject.appendChild(DesignerText);
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Fill.Style, 'Fill', data.Fill.Color));
  DrawingObject.appendChild(FontFamilyAsString);
  DrawingObject.appendChild(FontSize);
  DrawingObject.appendChild(FontStretchAsString);
  DrawingObject.appendChild(FontStyleAsString);
  DrawingObject.appendChild(FontWeightAsString);
  DrawingObject.appendChild(HorizontalAlignment);
  DrawingObject.appendChild(LineHeight);
  DrawingObject.appendChild(SameAsDesignerText);
  DrawingObject.appendChild(ShowBorder);
  DrawingObject.appendChild(getDecodeColor(xmlDom, data.Outline.Style, 'Stroke', data.Outline.Color));
  DrawingObject.appendChild(Text);
  DrawingObject.appendChild(TextAlignment);
  DrawingObject.appendChild(TextDecoration);
  DrawingObject.appendChild(TextWrapping);
  DrawingObject.appendChild(VerticalAlignment);

  children.appendChild(DrawingObject);  
}


const elements = xmlDom => {
  return {
    IsGroup: xmlDom.createElement('IsGroup'),
    IsLocked: xmlDom.createElement('IsLocked'),
    IsSelected: xmlDom.createElement('IsSelected'),
    IsVisible: xmlDom.createElement('IsVisible'),
    LastPivot: xmlDom.createElement('LastPivot'),
    Location: xmlDom.createElement('Location'),
    Name: xmlDom.createElement('Name'),
    Opacity: xmlDom.createElement('Opacity'),
    ParentID: xmlDom.createElement('ParentID'),
    PivotX: xmlDom.createElement('PivotX'),
    PivotY: xmlDom.createElement('PivotY'),
    Size: xmlDom.createElement('Size'),
    ZOrder: xmlDom.createElement('ZOrder'),
    Rotation: xmlDom.createElement('Rotation'),
    DesignerSource: xmlDom.createElement('DesignerSource'),
    OpacityMask: xmlDom.createElement('OpacityMask'),
    Source: xmlDom.createElement('Source'),
    Stretch: xmlDom.createElement('Stretch'),
    TransparencyTolerance: xmlDom.createElement('TransparencyTolerance'),
    DesignerText: xmlDom.createElement('DesignerText'),
    FontFamilyAsString: xmlDom.createElement('FontFamilyAsString'),
    FontSize: xmlDom.createElement('FontSize'),
    FontStretchAsString: xmlDom.createElement('FontStretchAsString'),
    FontStyleAsString: xmlDom.createElement('FontStyleAsString'),
    FontWeightAsString: xmlDom.createElement('FontWeightAsString'),
    HorizontalAlignment: xmlDom.createElement('HorizontalAlignment'),
    LineHeight: xmlDom.createElement('LineHeight'),
    SameAsDesignerText: xmlDom.createElement('SameAsDesignerText'),
    ShowBorder: xmlDom.createElement('ShowBorder'),
    Text: xmlDom.createElement('Text'),
    TextAlignment: xmlDom.createElement('TextAlignment'),
    TextDecoration: xmlDom.createElement('TextDecoration'),
    TextWrapping: xmlDom.createElement('TextWrapping'),
    VerticalAlignment: xmlDom.createElement('VerticalAlignment'),
    BorderStyle: xmlDom.createElement('BorderStyle'),
    CornerRadius: xmlDom.createElement('CornerRadius'),
    BarcodeType: xmlDom.createElement('BarcodeType'),
    Data: xmlDom.createElement('Data'),
    DesignerData: xmlDom.createElement('DesignerData'),
    Thickness: xmlDom.createElement('Thickness'),
    X1: xmlDom.createElement('X1'),
    X2: xmlDom.createElement('X2'),
    Y1: xmlDom.createElement('Y1'),
    Y2: xmlDom.createElement('Y2'),
    BorderThickness: xmlDom.createElement('BorderThickness'),
    X: xmlDom.createElement('X'),
    Y: xmlDom.createElement('Y'),
    Width: xmlDom.createElement('Width'),
    Height: xmlDom.createElement('Height'),
    ContentId: xmlDom.createElement('ContentId'),
    IsActive: xmlDom.createElement('IsActive'),
    DefaultFontFamilyAsString: xmlDom.createElement('DefaultFontFamilyAsString'),
    DefaultFontSize: xmlDom.createElement('DefaultFontSize'),
    Field1SelectedIndex: xmlDom.createElement('Field1SelectedIndex'),
    Field2SelectedIndex: xmlDom.createElement('Field2SelectedIndex'),
    FrontSideOpacity: xmlDom.createElement('FrontSideOpacity'),
    HGuides: xmlDom.createElement('HGuides'),
    IsFront: xmlDom.createElement('IsFront'),
    Layers: xmlDom.createElement('Layers'),
    MatchedPhotosSerialized: xmlDom.createElement('MatchedPhotosSerialized'),
    OrphanPhotos: xmlDom.createElement('OrphanPhotos'),
    PrintSettings: xmlDom.createElement('PrintSettings'),
    SelectedLayer: xmlDom.createElement('SelectedLayer'),
    SnapToGrid: xmlDom.createElement('SnapToGrid'),
    SnapToGuides: xmlDom.createElement('SnapToGuides'),
    VGuides: xmlDom.createElement('VGuides'),
    Zoom: xmlDom.createElement('Zoom'),
    BottomMargin: xmlDom.createElement('BottomMargin'),
    Columns: xmlDom.createElement('Columns'),
    IsLandscape: xmlDom.createElement('IsLandscape'),
    LeftMargin: xmlDom.createElement('LeftMargin'),
    PageHeight: xmlDom.createElement('PageHeight'),
    PageWidth: xmlDom.createElement('PageWidth'),
    RightMargin: xmlDom.createElement('RightMargin'),
    Rows: xmlDom.createElement('Rows'),
    TopMargin: xmlDom.createElement('TopMargin'),
    Title: xmlDom.createElement('Title'),
    ConnectionString: xmlDom.createElement('ConnectionString'),
    IsQuery: xmlDom.createElement('IsQuery'), 
    IsQueryExecuting: xmlDom.createElement('IsQueryExecuting'), 
    Query: xmlDom.createElement('Query'), 
    RaiseExceptionOnError: xmlDom.createElement('RaiseExceptionOnError'), 
    SelectedProvider: xmlDom.createElement('SelectedProvider'), 
    SelectedTable: xmlDom.createElement('SelectedTable'), 
    TextFileHasHeaders: xmlDom.createElement('TextFileHasHeaders'),
    Drawing: xmlDom.createElement('Drawing')
  }
}

const getDecodeColor = (xmlDom, type, name, data) => {
  var Name = xmlDom.createElement(name);
  var Opacity = xmlDom.createElement('d5p1:Opacity');
  var RelativeTransform = xmlDom.createElement('d5p1:RelativeTransform');
  var Transform = xmlDom.createElement('d5p1:Transform');
  
  var Matrix = xmlDom.createElement('d5p1:Matrix');
  var m11 = xmlDom.createElement('d5p1:_m11');
  var m12 = xmlDom.createElement('d5p1:_m12');
  var m21 = xmlDom.createElement('d5p1:_m21');
  var m22 = xmlDom.createElement('d5p1:_m22');
  var _offsetX = xmlDom.createElement('d5p1:_offsetX');
  var _offsetY = xmlDom.createElement('d5p1:_offsetY');
  var _padding = xmlDom.createElement('d5p1:_padding');
  var _type = xmlDom.createElement('d5p1:_type');
  var ColorInterpolationMode = xmlDom.createElement('d5p1:ColorInterpolationMode');
  var GradientStops = xmlDom.createElement('d5p1:GradientStops'); 
  var MappingMode = xmlDom.createElement('d5p1:MappingMode');
  var SpreadMethod = xmlDom.createElement('d5p1:SpreadMethod');
  var EndPoint = xmlDom.createElement('d5p1:EndPoint');
  var _x = xmlDom.createElement('d6p1:_x');
  var _y = xmlDom.createElement('d6p1:_y');
  var StartPoint = xmlDom.createElement('d5p1:StartPoint');
  var Center = xmlDom.createElement('d5p1:Center');
  var GradientOrigin = xmlDom.createElement('d5p1:GradientOrigin');
  var RadiusX = xmlDom.createElement('d5p1:RadiusX');
  var RadiusY = xmlDom.createElement('d5p1:RadiusY');

  Name.setAttribute('xmlns:d5p1', "http://schemas.datacontract.org/2004/07/System.Windows.Media");

  Opacity.textContent = 1;
  RelativeTransform.setAttribute('i:type', "d5p1:MatrixTransform");
  m11.textContent = 1;
  m12.textContent = 0;
  m21.textContent = 0;
  m22.textContent = 1;
  _offsetX.textContent = 0;
  _offsetY.textContent = 0;
  _padding.textContent = 0;
  _type.textContent = "TRANSFORM_IS_IDENTITY";
  Matrix.appendChild(m11)
  Matrix.appendChild(m12)
  Matrix.appendChild(m21)
  Matrix.appendChild(m22)
  Matrix.appendChild(_offsetX)
  Matrix.appendChild(_offsetY)
  Matrix.appendChild(_padding)
  Matrix.appendChild(_type)
  RelativeTransform.appendChild(Matrix);

  Name.appendChild(Opacity);
  Name.appendChild(RelativeTransform);
  Name.appendChild(Transform);

  switch (type) {
    case 'SolidColor':      
      Name.setAttribute('i:type', "d5p1:SolidColorBrush");     
      var value = data.split(' ');  
      Name.appendChild(getColorElement(value[6], xmlDom));
      break;
    case 'LinearGradientColor':
      Name.setAttribute('i:type', "d5p1:LinearGradientBrush");
      ColorInterpolationMode.textContent = "SRgbLinearInterpolation";
      var value = data.split(' '); 
      for (var i = 0; i < parseInt(value[0]); i ++) {
        var GradientStop = xmlDom.createElement('d5p1:GradientStop');
        var Offset = xmlDom.createElement('d5p1:Offset');
        Offset.textContent = parseInt(value[7+2*i]) / 100;
        GradientStop.appendChild(getColorElement(value[6+2*i], xmlDom));
        GradientStop.appendChild(Offset);
        GradientStops.appendChild(GradientStop);
      }

      MappingMode.textContent = "RelativeToBoundingBox";
      SpreadMethod.textContent = 'Pad';
      _x.textContent = parseInt(value[1]) / 100;
      _y.textContent = parseInt(value[2]) / 100;
      StartPoint.appendChild(_x);
      StartPoint.appendChild(_y);
      StartPoint.setAttribute('xmlns:d6p1', 'http://schemas.datacontract.org/2004/07/System.Windows');
      _x = xmlDom.createElement('d6p1:_x');
      _y = xmlDom.createElement('d6p1:_y');
      _x.textContent = parseInt(value[3]) / 100;
      _y.textContent = parseInt(value[4]) / 100;
      EndPoint.appendChild(_x);
      EndPoint.appendChild(_y);
      EndPoint.setAttribute('xmlns:d6p1', 'http://schemas.datacontract.org/2004/07/System.Windows');
      Name.appendChild(ColorInterpolationMode);
      Name.appendChild(GradientStops);
      Name.appendChild(MappingMode);
      Name.appendChild(SpreadMethod);
      Name.appendChild(EndPoint);
      Name.appendChild(StartPoint);
      break;
    case 'RadialGradientColor':
      Name.setAttribute('i:type', "d5p1:RadialGradientBrush");
      ColorInterpolationMode.textContent = "SRgbLinearInterpolation";
      var value = data.split(' '); 
      for (var i = 0; i < parseInt(value[0]); i ++) {
        var GradientStop = xmlDom.createElement('d5p1:GradientStop')
        var Offset = xmlDom.createElement('d5p1:Offset');
        Offset.textContent = parseInt(value[7+2*i]) / 100;
        GradientStop.appendChild(getColorElement(value[6+2*i], xmlDom));
        GradientStop.appendChild(Offset);
        GradientStops.appendChild(GradientStop);
      }

      MappingMode.textContent = "RelativeToBoundingBox";
      SpreadMethod.textContent = 'Pad';

      _x.textContent = parseInt(value[1]) / 100;
      _y.textContent = parseInt(value[2]) / 100;
      Center.appendChild(_x);
      Center.appendChild(_y);
      Center.setAttribute('xmlns:d6p1', 'http://schemas.datacontract.org/2004/07/System.Windows');
      _x = xmlDom.createElement('d6p1:_x');
      _y = xmlDom.createElement('d6p1:_y');
      _x.textContent = parseInt(value[3]) / 100;
      _y.textContent = parseInt(value[4]) / 100;
      GradientOrigin.appendChild(_x);
      GradientOrigin.appendChild(_y);
      GradientOrigin.setAttribute('xmlns:d6p1', 'http://schemas.datacontract.org/2004/07/System.Windows');
      RadiusX.textContent = parseInt(value[5]) / 100;
      RadiusY.textContent = parseInt(value[5]) / 100;
      Name.appendChild(ColorInterpolationMode);
      Name.appendChild(GradientStops);
      Name.appendChild(MappingMode);
      Name.appendChild(SpreadMethod);
      Name.appendChild(Center);
      Name.appendChild(GradientOrigin);
      Name.appendChild(RadiusX);
      Name.appendChild(RadiusY);
      break;    
  }

  return Name;
}

const getColorElement = (value, xmlDom) => {
  var Color = xmlDom.createElement('d5p1:Color');
  var A = xmlDom.createElement('d5p1:A');
  var R = xmlDom.createElement('d5p1:R');
  var G = xmlDom.createElement('d5p1:G');
  var B = xmlDom.createElement('d5p1:B');
  var ScA = xmlDom.createElement('d5p1:ScA');
  var ScR = xmlDom.createElement('d5p1:ScR');
  var ScG = xmlDom.createElement('d5p1:ScG');
  var ScB = xmlDom.createElement('d5p1:ScB');

  A.textContent = parseInt(value.substr(7), 16);
  G.textContent = parseInt(value.substr(3, 2), 16);
  B.textContent = parseInt(value.substr(5, 2), 16);
  R.textContent = parseInt(value.substr(1, 2), 16);
  ScA.textContent = A.textContent / 255;
  ScG.textContent = G.textContent / 255;
  ScB.textContent = B.textContent / 255;
  ScR.textContent = R.textContent / 255;
  Color.appendChild(A);
  Color.appendChild(G);
  Color.appendChild(B);
  Color.appendChild(R);
  Color.appendChild(ScA);
  Color.appendChild(ScG);
  Color.appendChild(ScB);
  Color.appendChild(ScR);

  return Color;
}


const getSolidColorElement = (name, value, xmlDom) => {
  var Color = xmlDom.createElement(name);
  var A = xmlDom.createElement('d5p1:A');
  var R = xmlDom.createElement('d5p1:R');
  var G = xmlDom.createElement('d5p1:G');
  var B = xmlDom.createElement('d5p1:B');
  var ScA = xmlDom.createElement('d5p1:ScA');
  var ScR = xmlDom.createElement('d5p1:ScR');
  var ScG = xmlDom.createElement('d5p1:ScG');
  var ScB = xmlDom.createElement('d5p1:ScB');

  A.textContent = parseInt(value.substr(7), 16);
  G.textContent = parseInt(value.substr(3, 2), 16);
  B.textContent = parseInt(value.substr(5, 2), 16);
  R.textContent = parseInt(value.substr(1, 2), 16);
  ScA.textContent = A.textContent / 255;
  ScG.textContent = G.textContent / 255;
  ScB.textContent = B.textContent / 255;
  ScR.textContent = R.textContent / 255;
  Color.appendChild(A);
  Color.appendChild(G);
  Color.appendChild(B);
  Color.appendChild(R);
  Color.appendChild(ScA);
  Color.appendChild(ScG);
  Color.appendChild(ScB);
  Color.appendChild(ScR);

  return Color;
}